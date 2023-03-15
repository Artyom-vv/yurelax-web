import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {map, Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";
import * as THREE from 'three';
import {AnimationClip} from "three/src/Three";
import {ModelService} from "../../../../../shared/services/model.service";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Group} from "three";
import {FormBuilder, FormGroup} from "@angular/forms";

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
    private fb: FormBuilder
  ) {
  }

  @ViewChild('viewer') viewer!: ElementRef;

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public form!: FormGroup
  public userStore: UserStoreInterface | null = null

  public model!: Group;
  public controls!: OrbitControls;
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
    this.initForms();
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
    const canvasSizes = {
      width: this.viewer.nativeElement.offsetWidth,
      height: this.viewer.nativeElement.offsetHeight,
    };
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.1,
      1000
    );
    this.loader = new OBJLoader();
    this.textureLoader = new THREE.TextureLoader;

    this.loader.load(this.modelBlob, (object: any) => {
      this.textureLoader.load(this.userStore?.userInfo.skinUrl as string);
      object.position.set(0,4,0)
      object.rotation.set(0,135 * (Math.PI / 180),0)
      this.model = object;
      this.scene.add(object)
    });

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    this.scene.add(pointLight);
    this.scene.add(this.ambientLight);


    this.camera.position.set(5,0,5);
    this.scene.add(this.camera);

    if (!this.viewer.nativeElement) return

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.viewer.nativeElement,
    });
    this.renderer.setClearColor(0xe0B0F13, 1);
    this.renderer.setSize(canvasSizes.width, canvasSizes.height);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.minPolarAngle = this.controls.maxPolarAngle = Math.PI / 2;

    this.controls.enableZoom = false

    const animate = () => {
      requestAnimationFrame(animate);
      // const yy = this.model.rotation.y * 180 / Math.PI
      // this.model.rotation.set(0,(yy+0.5) * (Math.PI / 180),0);
      this.renderer.render(this.scene, this.camera);
    }

    animate();
  }

  private initForms(): void {
    this.form = this.fb.group({
      rotation: [null]
    })
  }
}
