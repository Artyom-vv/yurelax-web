import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DonateModalComponent} from "../donate-modal.component";

@Injectable()
export class DonateModalService {
  constructor(
    private dialog: MatDialog,
  ) {
  }

  private dialogRef?: MatDialogRef<DonateModalComponent>

  public config<T = any>(data?: T): MatDialogConfig<T> {
    return {
      panelClass: 'donate-modal',
      maxWidth: 740,
      width: '100%',
      data
    }
  }

  open<T>(data?: T) {
    this.dialogRef = this.dialog.open(DonateModalComponent, this.config(data))
    return this.dialogRef
  }

  close() {
    this.dialogRef?.close()
  }
}
