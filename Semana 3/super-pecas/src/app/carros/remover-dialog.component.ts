import { Component, Inject } from "@angular/core";
import { CarrosService } from "../../service/carros.service";
import { Subject, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'remover-dialog',
    templateUrl: 'remover-dialog.component.html',
})
export class RemoverCarroDialog {

    private unsubscribe = new Subject<void>;

    constructor(public carrosService: CarrosService, public dialogRef: MatDialogRef<RemoverCarroDialog>, @Inject(MAT_DIALOG_DATA) public data: {id: number}) {

    }

    removerCarro() {
        this.carrosService.removerCarro(this.data.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.dialogRef.close(true);
            });
    }


}