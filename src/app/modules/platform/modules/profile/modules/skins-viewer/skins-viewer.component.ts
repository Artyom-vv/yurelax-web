import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {Subscription, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import {ModelService} from "../../../../../shared/services/model.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SkinViewer} from "skinview3d";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'yrx-skins-viewer',
  templateUrl: './skins-viewer.component.html',
  styleUrls: ['./skins-viewer.component.scss']
})
export class SkinsViewerComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private skinsService: SkinsService,
    private appStore: AppStore,
    private modelService: ModelService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public form!: FormGroup
  public userStore: UserStoreInterface | null = null
  public skin!: SkinViewer;

  ngAfterViewInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((userStore) => {
          this.userStore = userStore;
          this.skin = new SkinViewer({
            canvas: this.viewer.nativeElement,
            width: 293,
            height: 320,
            zoom: 0.8,
            skin: this.userStore?.userInfo.skinUrl as string
          });
          this.skin.controls.enableZoom = false
          // this.skin.canvas.addEventListener('mouseup', () => {
            // const animation = () => {
            //   let x: number = (this.skin.playerObject.rotation.x * 180) / Math.PI
            //   let y: number = (this.skin.playerObject.rotation.y * 180) / Math.PI
            //   let z: number = (this.skin.playerObject.rotation.z * 180) / Math.PI
            //   if (x-1 > 0) {x-=0.2} else x=0;
            //   if (y-1 > 0) {y-=0.2} else y=0;
            //   if (z-1 > 0) {z-=0.2} else z=0;
            //   console.log(x,y,z)
            //   this.skin.playerObject.rotation.set(x*Math.PI/180,y*Math.PI/180,z*Math.PI/180,)
            //   this.skin.renderer.render(this.skin.scene,this.skin.camera)
            //   if (x>0 || y>0 || z>0) requestAnimationFrame(animation);
            // }
            // animation()
          // });
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
        }),
        catchError((err) => {
          this.dataLoading = false;
          this._snackBar.open('Неправильный формат скина', 'Закрыть')
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

  test() {
    console.log('t')
  }
}
