import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MiniGamesService} from "../../../../../shared/services/mini-games.service";
import {debounceTime, distinctUntilChanged, finalize, first, Subscription, takeUntil, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {KeyValidator} from "../../../../../shared/validators/key.validator";
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {MiniGameResponseInterface} from "../../../../../shared/interfaces/mini-game-response.interface";
import {ExistingMiniGameValidator} from "../../../../../shared/validators/existing-mini-game.validator";
import {
  DropBoxOnChangeInterface
} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {StatisticsService} from "../../../../../shared/services/statistics.service";
import {RequestsCancellerService} from "../../../../../shared/services/requests-canceller.service";
import {ITagResponse} from "../../../../../shared/modules/tag/interfaces/tag.interface";

@Component({
  selector: 'yrx-mini-games-create',
  templateUrl: './mini-games-create.component.html',
  styleUrls: ['./mini-games-create.component.scss']
})
export class MiniGamesCreateComponent implements OnInit {

  constructor(
    private miniGamesService: MiniGamesService,
    private statisticsService: StatisticsService,
    private fb: FormBuilder,
    private requestsCancellerService: RequestsCancellerService,
    private _snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef
  ) {
  }

  @Input() data!: StatisticsResponseInterface;
  @Input() isEdit: boolean = false
  @Output() onCreate: EventEmitter<MiniGameResponseInterface> = new EventEmitter<MiniGameResponseInterface>();
  @Output() onUpdate: EventEmitter<MiniGameResponseInterface> = new EventEmitter<MiniGameResponseInterface>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  private subscriptions: Subscription[] = []

  public form!: FormGroup
  public dataLoading: boolean = false;
  public statisticsLoading: boolean = false;
  public dndResponse?: DropBoxOnChangeInterface;
  public statisticsList: StatisticsResponseInterface[] = []

  ngOnInit() {
    this.initForms()
    this.watchForms()
    this.dataFields()
  }

  get statisticsSelectedList(): StatisticsResponseInterface[] {
    return this.statisticsList.filter(statistics => this.form.getRawValue().keys.includes(statistics.key));
  }

  public create(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.miniGamesService.createMiniGame(this.form.getRawValue()).subscribe()
    )
  }

  public edit() {
    this.dataLoading = true;
    this.subscriptions.push(
      this.miniGamesService.updateMiniGame(this.form.getRawValue()).pipe(
        first(),
        tap((value) => {
          this.onUpdate.emit(value);
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message, "Закрыть")
          throw new Error(err)
        })
      ).subscribe()
    )
  }

  public cancel() {
    this.onCancel.emit();
  }


  public getList(value: string | null) {
    this.statisticsLoading = true
    this.statisticsService.getStatisticsList({value}).pipe(
      takeUntil(this.requestsCancellerService.destroy$),
      tap((list) => {
        this.statisticsList = list;
      }),
      finalize(() => this.statisticsLoading = false),
      catchError((err) => {
        this._snackBar.open(err.error.message, "Закрыть")
        throw new Error(err)
      })
    ).subscribe()
  }

  public onPreviewSelect($event: DropBoxOnChangeInterface) {
    this.form.patchValue({
      image: $event.file
    })
    this.dndResponse = $event
    console.log($event)
  }

  public onSelectTag($event: ITagResponse<any>) {
    const array: string[] = this.form.getRawValue().keys.filter((key: string) => key !== $event.value);
    this.form.patchValue({
      keys: $event.selected ? [...array, $event.value] : array
    })
  }

  public onSelectFilteredByKeyTag($event: ITagResponse<any>) {
    this.form.patchValue({
      filteredByKey: $event.selected ? $event.value : null
    })
  }

  private initForms(): void {
    this.form = this.fb.group({
      image: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      iconStroked: [true],
      statisticsSearch: [null],
      filteredByKey: [null, [Validators.required]],
      keys: [[], [Validators.required]],
      miniGameKey: [null, [Validators.required, KeyValidator()], [ExistingMiniGameValidator(this.miniGamesService)]]
    })
  }

  private dataFields() {
    this.subscriptions.push(
      this.statisticsService.getStatisticsList({value: null}).pipe(
        tap((statistics) => {
          this.statisticsList = statistics
        })
      ).subscribe()
    )
  }

  private watchForms(): void {
    this.form.get('statisticsSearch')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      tap((value) => {
        this.requestsCancellerService.cancel()
        this.getList(value)
      })
    ).subscribe()
  }
}
