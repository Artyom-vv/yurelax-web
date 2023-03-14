import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropBoxOnChangeInterface} from "../../../../../shared/modules/drag-and-drop/interfaces/drop-box.interface";
import {SkinsService} from "../../../../../shared/services/skins.service";
import {AppStore} from "../../../../../../store/app.store";
import {filter, Subscription, switchMap, tap} from "rxjs";
import {UserStoreInterface} from "../../../../../../store/interfaces/user-store.interface";

@Component({
  selector: 'yrx-skins-viewer',
  templateUrl: './skins-viewer.component.html',
  styleUrls: ['./skins-viewer.component.scss']
})
export class SkinsViewerComponent implements OnInit, OnDestroy {

  constructor(
    private skinsService: SkinsService,
    private appStore: AppStore
  ) {
  }

  private subscriptions: Subscription[] = []

  public dataLoading: boolean = false;
  public userStore: UserStoreInterface | null = null


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
}
