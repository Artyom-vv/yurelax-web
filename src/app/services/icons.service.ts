import {Injectable} from '@angular/core'
import {RefIconService} from '../modules/shared/modules/ref-icon/services/ref-icon.service';

@Injectable()
export class IconsService {
  constructor(
    private refIconService: RefIconService
  ) {
  }

  public icons: { name: string, pathName: string }[] = [
    {name: 'ucoin', pathName: 'ucoin'},
    {name: 'login', pathName: 'log-in'},
    {name: 'check-circle', pathName: 'check-circle'},
    {name: 'x-circle', pathName: 'x-circle'},
    {name: 'x', pathName: 'x'},
    {name: 'grid', pathName: 'layout-grid'},
    {name: 'home', pathName: 'home'},
    {name: 'wallet', pathName: 'wallet'},
    {name: 'logout', pathName: 'log-out'},
    {name: 'boxes', pathName: 'boxes'},
    {name: 'box', pathName: 'box'},
    {name: 'download', pathName: 'download'},
    {name: 'command', pathName: 'command'},
    {name: 'book', pathName: 'book'},
    {name: 'chevron-right', pathName: 'chevron-right'},
    {name: 'chevron-left', pathName: 'chevron-left'},
    {name: 'arrow-right', pathName: 'arrow-right'},
    {name: 'arrow-left', pathName: 'arrow-left'},
    {name: 'arrow-up', pathName: 'arrow-up'},
    {name: 'shopping-bag', pathName: 'shopping-bag'},
    {name: 'user-plus', pathName: 'user-plus'},
    {name: 'settings', pathName: 'settings'},
    {name: 'alert-triangle', pathName: 'alert-triangle'},
    {name: 'laptop', pathName: 'laptop'},
    {name: 'file', pathName: 'file'},
    {name: 'joystick', pathName: 'joystick'},
    {name: 'copy', pathName: 'copy'},
  ]

  public async initIcons(): Promise<void> {
    for (const icon of this.icons) {
      await this.refIconService.registerIconFromAssets(icon.name, `assets/${icon.pathName}.svg`)
    }
  }
}
