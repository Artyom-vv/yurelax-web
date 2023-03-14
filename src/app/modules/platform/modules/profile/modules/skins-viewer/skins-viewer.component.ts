import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import * as THREE from 'three';

@Component({
  selector: 'yrx-skins-viewer',
  templateUrl: './skins-viewer.component.html',
  styleUrls: ['./skins-viewer.component.scss']
})
export class SkinsViewerComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private skinsService: SkinsService,
    private appStore: AppStore
  ) {

  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public userStore: UserStoreInterface | null = null

  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;

  ngAfterViewInit() {
    this.create3DScene();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        tap((userStore) => {
          this.userStore = userStore;
        }),
      ).subscribe()
    )
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
        })
      ).subscribe()
    }
  }

  public create3DScene() {
    const scene = new THREE.Scene();

    const material = new THREE.MeshToonMaterial();
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.x = 15;
    pointLight.position.y = 15;
    pointLight.position.z = 15;
    scene.add(pointLight);
    scene.add(box);

    const canvasSizes = {
      width: this.viewer.nativeElement.offsetWidth,
      height: this.viewer.nativeElement.offsetHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      60,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);

    if (!this.viewer.nativeElement) return

    const renderer = new THREE.WebGLRenderer({
      canvas: this.viewer.nativeElement,
    });
    renderer.setClearColor(0xe0B0F13, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    renderer.render(scene, camera);
  }
}
