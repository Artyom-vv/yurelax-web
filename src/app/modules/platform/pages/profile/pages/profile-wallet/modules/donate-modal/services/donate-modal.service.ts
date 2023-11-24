import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DonateModalComponent} from "../donate-modal.component";
import {modalConfig} from "../../../../../../../../shared/helpers/modal";

@Injectable()
export class DonateModalService {
  constructor(
    private dialog: MatDialog,
  ) {
  }

  private dialogRef?: MatDialogRef<DonateModalComponent>

  open<T>(data?: T) {
    this.dialogRef = this.dialog.open(DonateModalComponent, modalConfig({
      panelClass: 'donate-modal',
      maxWidth: 740,
      width: '100%',
      data
    }))
    return this.dialogRef
  }

  close() {
    this.dialogRef?.close()
  }
}
