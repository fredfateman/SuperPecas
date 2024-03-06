import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrosService } from '../../service/carros.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Carro } from '../../model/carros.model';
import { NotificationType, NotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: './carro-edit.component.html',
    styleUrl: './carro-edit.component.css'
})
export class CarroEditComponent implements OnInit {
    private unsubscribe = new Subject<void>;
    type!: string;
    carroForm!: FormGroup;
    carro!: Carro;
    loading: boolean = true;

    get f(): any {
        return this.carroForm.controls;
    }

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private carrosService: CarrosService, private _notifications: NotificationsService, private router: Router) { }

    ngOnInit() {
        this.type = this.route.snapshot.data["type"];
        this.createFormGroup(null);

        if (this.type === "editar") {
            let id = this.route.snapshot.params["id"];
            if (id)
                this.getCarro(id);
        }
    }

    createFormGroup(data: any): void {
        this.carroForm = this.formBuilder.group({
            id: [data ? data.id : "0"],
            nomeModelo: [data ? data.nomeModelo : "", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            fabricante: [data ? data.fabricante : "", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            codigoUnico: [data ? data.codigoUnico : "", [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        });
    }

    getCarro(id: number){
        this.carrosService.getCarro(id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((result: any) => {
            this.createFormGroup(result);
            this.carro = result;
            this.loading = false;
        });
    }

    gravarCarro(){
        if (this.carroForm.invalid) {
            return;
        }
        this.carro = this.carroForm.value;
        if (this.type === "adicionar") {
            this.carrosService.gravarCarro(this.carro)  
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((result: any) => {
                this._notifications.create("Sucesso", "Carro cadastrado com sucesso", NotificationType.Success);
                this.router.navigate(["/carros"]);
            });
        }
        else {
            this.carrosService.atualizarCarro(this.carro)  
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((result: any) => {
                this._notifications.create("Sucesso", "Carro atualizado com sucesso", NotificationType.Success);
                this.router.navigate(["/carros"]);
            });
        }
    }

    limparFormulario() {
        this.carroForm.reset();
      }
    

}
