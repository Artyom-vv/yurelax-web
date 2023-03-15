import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {map, Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import * as THREE from 'three';
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AnimationClip} from "three/src/Three";
import {ModelService} from "../../../../../shared/services/model.service";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

@Component({
  selector: 'yrx-skins-viewer',
  templateUrl: './skins-viewer.component.html',
  styleUrls: ['./skins-viewer.component.scss']
})
export class SkinsViewerComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private skinsService: SkinsService,
    private appStore: AppStore,
    private modelService: ModelService
  ) {

  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public userStore: UserStoreInterface | null = null

  public action!: THREE.AnimationAction;
  public animation!: AnimationClip;
  public mixer!: THREE.AnimationMixer;
  public loader!: OBJLoader;
  public textureLoader!: THREE.TextureLoader;
  public scene!: THREE.Scene;
  public ambientLight!: THREE.AmbientLight;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;

  public modelBlob!: string;

  ngAfterViewInit() {
    this.subscriptions.push(
      this.appStore.user$.pipe(
        map((userStore) => {
          this.userStore = userStore;
          const skinType = this.userStore?.userInfo.skinType;
          return skinType === 'default' ? 'steve' : 'alex';
        }),
        switchMap((path) => this.modelService.getModel(path)),
        tap((gltfBlob) => {
          const reader = new FileReader();
          reader.readAsDataURL(gltfBlob);
          reader.onloadend = () => {
            const base64data = reader.result;
            this.modelBlob = base64data!.toString();
            this.create3DScene();
          };
        })
      ).subscribe()
    )
  }

  ngOnInit() {
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
    this.scene = new THREE.Scene();

    this.loader = new OBJLoader();
    this.textureLoader = new THREE.TextureLoader;


    this.loader.load(this.modelBlob, (object) => {
      object.position.set(0,0,0)
      this.textureLoader.load(this.userStore?.userInfo.skinUrl as string, (texture) => {})
      this.scene.add(object)
    });

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    this.scene.add(pointLight);
    this.scene.add(this.ambientLight);

    const canvasSizes = {
      width: this.viewer.nativeElement.offsetWidth,
      height: this.viewer.nativeElement.offsetHeight,
    };

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.1,
      1000
    );

    this.camera.position.z = 5;
    this.camera.position.y = 0  ;
    this.scene.add(this.camera);

    if (!this.viewer.nativeElement) return

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.viewer.nativeElement,
    });
    this.renderer.setClearColor(0xe0B0F13, 1);
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    }

    animate();
  }
}
