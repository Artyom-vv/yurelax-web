import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MiniGamesService} from "../../../../../shared/services/mini-games.service";
import {finalize, first, Subscription, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {KeyValidator} from "../../../../../shared/validators/key.validator";
import {ExistingStatisticsValidator} from "../../../../../shared/validators/existing-statistics.validator";
import {StatisticsResponseInterface} from "../../../../../shared/interfaces/statistics-response.interface";
import {MiniGameResponseInterface} from "../../../../../shared/interfaces/mini-game-response.interface";
import {ExistingMiniGameValidator} from "../../../../../shared/validators/existing-mini-game.validator";

@Component({
  selector: 'yrx-mini-games-create',
  templateUrl: './mini-games-create.component.html',
  styleUrls: ['./mini-games-create.component.scss']
})
export class MiniGamesCreateComponent implements OnInit {

  constructor(
    private miniGamesService: MiniGamesService,
    private fb: FormBuilder,
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

  ngOnInit() {
    this.initForms()
  }

  public create(): void {
    this.dataLoading = true;
    this.subscriptions.push(
      this.miniGamesService.createMiniGame(this.form.getRawValue()).pipe(
        first(),
        tap((value) => {
          this.onCreate.emit(value);
          this.form.reset()
          this._snackBar.open(`Мини-игра "${value.name}" успешно создана`, 'Хорошо')
        }),
        finalize(() => this.dataLoading = false),
        catchError((err) => {
          this._snackBar.open(err.error.message, "Закрыть")
          throw new Error(err)
        })
      ).subscribe()
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

  private initForms(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      icon: [null, [Validators.required]],
      iconStroked: [null, [Validators.required]],
      filteredByKey: [null, [Validators.required]],
      keys: [null, [Validators.required]],
      miniGameKey: [null, [Validators.required, KeyValidator()], [ExistingMiniGameValidator(this.miniGamesService)]]
    })
  }
}
