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
import {FormBuilder, FormGroup} from "@angular/forms";
import {SkinViewer, WalkingAnimation} from "skinview3d";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserRes} from "../../../../interfaces/user.interface";

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
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public form!: FormGroup
  public userStore: UserRes | null = null
  public skin: SkinViewer | null = null;
  public modelLoading: boolean = true;
  public rotationValue: any;

  ngAfterViewInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((userStore) => {
          if (this.userStore?.userInfoRef.skinUrl !== userStore?.userInfoRef.skinUrl) {
          this.modelLoading = true;
            setTimeout(() => {
              this.skin = new SkinViewer({
                canvas: this.viewer.nativeElement,
                width: 293,
                height: 320,
                zoom: 0.8,
                model: userStore?.userInfoRef.skinType,
                skin: userStore?.userInfoRef.skinUrl as string
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
    if (this.userStore?._id) {
      this.dataLoading = true;
      this.skinsService.uploadSkin(this.userStore!._id, $event.file).pipe(
        tap((res) => {
          if (this.userStore) {
            this.appStore.setUser({
              ...this.userStore,
              userInfoRef: {
                ...this.userStore.userInfoRef,
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

  rotationChange($event: number) {
    if (this.skin && this.skin.camera) {
      this.skin.playerObject.rotation.y = $event
    }
  }
}
