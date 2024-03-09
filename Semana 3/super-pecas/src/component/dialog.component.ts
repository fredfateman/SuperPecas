import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog',
    templateUrl: 'dialog.component.html',
})
export class Dialog {

    texto!: String;

    constructor(public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: { texto: string }) {
        this.texto = data.texto;
    }

    userConfirm() {
        this.dialogRef.close(true);
    }
}