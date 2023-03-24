import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {ModelService} from "../../../../../shared/services/model.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SkinViewer, WalkingAnimation} from "skinview3d";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-skins-viewer',
  templateUrl: './skins-viewer.component.html',
  styleUrls: ['./skins-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkinsViewerComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private skinsService: SkinsService,
    private appStore: AppStore,
    private modelService: ModelService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public form!: FormGroup
  public userStore: UserStoreInterface | null = null
  public skin: SkinViewer | null = null;
  public modelLoading: boolean = true;

  ngAfterViewInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((userStore) => {
          if (this.userStore?.userInfo.skinUrl !== userStore?.userInfo.skinUrl) {
          this.modelLoading = true;
            setTimeout(() => {
              this.skin = new SkinViewer({
                canvas: this.viewer.nativeElement,
                width: 293,
                height: 320,
                zoom: 0.8,
                model: userStore?.userInfo.skinType,
                skin: userStore?.userInfo.skinUrl as string
              })
              this.skin.controls.enableZoom = false
              this.skin.animation = new WalkingAnimation()
              this.skin.animation.speed = 0.5;
              this.modelLoading = false;
              this.cdr.detectChanges()
            }, 600)
          }
          this.userStore = userStore;
          this.cdr.detectChanges()
        }),
      ).subscribe()
    )
  }

  ngOnInit() {
    this.initForms();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onSelectFile($event: DropBoxOnChangeInterface) {
    if (this.userStore?.user?.userId) {
      this.dataLoading = true;
      this.skinsService.uploadSkin(this.userStore!.user!.userId, $event.file).pipe(
        tap((res) => {
          if (this.userStore) {
            this.appStore.setUser({
              ...this.userStore,
              userInfo: {
                ...this.userStore.userInfo,
                ...res
              }
            })
          }
          this.dataLoading = false;
          this.cdr.detectChanges()
        }),
        catchError((err) => {
          this.dataLoading = false;
          this._snackBar.open('Неправильный формат скина', 'Закрыть')
          this.cdr.detectChanges()
          throw new Error(err)
        })
      ).subscribe()
    }
  }

  private initForms(): void {
    this.form = this.fb.group({
      rotation: [null]
    })
  }
}
