import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DonateModalComponent} from "../donate-modal.component";

@Injectable()
export class DonateModalService {
  constructor(
    private dialog: MatDialog,
  ) {
  }

  public config<T = any>(data?: T): MatDialogConfig<T> {
    return {
      panelClass: 'donate-modal',
      maxWidth: 740,
      width: '100%',
      data
    }
  }

  open<T>(data?: T) {
    return this.dialog.open(DonateModalComponent, this.config(data))
  }
}
