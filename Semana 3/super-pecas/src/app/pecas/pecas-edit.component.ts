import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { Peca } from '../../model/pecas.model';
import { PecasService } from '../../service/pecas.service';
import { CarrosService } from '../../service/carros.service';
import { Carro } from '../../model/carros.model';

@Component({
    templateUrl: './pecas-edit.component.html',
    styleUrl: './pecas-edit.component.css'
})
export class PecasEditComponent implements OnInit {
    private unsubscribe = new Subject<void>;
    type!: string;
    pecaForm!: FormGroup;
    peca!: Peca;
    carros: Carro[] | undefined;
    loading: boolean = true;

    get f(): any {
        return this.pecaForm.controls;
    }

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private pecasService: PecasService, private carrosService: CarrosService, private _notifications: NotificationsService, private router: Router) { }

    ngOnInit() {
        this.getCarros();
        this.type = this.route.snapshot.data["type"];
        this.createFormGroup(null);

        if (this.type === "editar") {
            let id = this.route.snapshot.params["id"];
            if (id)
                this.getPeca(id);
        }
    }

    createFormGroup(data: any): void {
        this.pecaForm = this.formBuilder.group({
            id: [data ? data.id : "0"],
            nome: [data ? data.nome : "", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            descricao: [data ? data.descricao : "", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            numeroSerie: [data ? data.numeroSerie : "", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            fabricante: [data ? data.fabricante : "", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            modeloCarro: [data ? data.modeloCarro : "", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            carroId: [data ? data.carroId : "", [Validators.required]],
        });
    }

    getCarros() {
        this.carrosService.getTodosCarros()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
                next: (response) => {
                    this.carros = response;
                },
                error: (error) => {
                    this._notifications.create("Erro", error.error, NotificationType.Error);
                }
            });
    }

    getPeca(id: number) {
        this.pecasService.getPeca(id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((result: any) => {
                this.createFormGroup(result);
                this.peca = result;
                this.loading = false;
            });
    }

    gravarPeca() {
        if (this.pecaForm.invalid) {
            return;
        }
        this.peca = this.pecaForm.value;
        if (this.type === "adicionar") {
            this.pecasService.gravarPeca(this.peca)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe({
                    next: () => {
                        this._notifications.create("Sucesso", "Peça cadastrada com sucesso", NotificationType.Success);
                        this.router.navigate(["/pecas"]);
                    },
                    error: (error) => {
                        this._notifications.create("Erro", error.error, NotificationType.Error);
                    }
                });
        }
        else {
            this.pecasService.atualizarPeca(this.peca)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe({
                    next: () => {
                        this._notifications.create("Sucesso", "Peça atualizada com sucesso", NotificationType.Success);
                        this.router.navigate(["/pecas"]);
                    },
                    error: (error) => {
                        this._notifications.create("Erro", error.error, NotificationType.Error);
                    }
                });
        }
    }

    limparFormulario() {
        this.pecaForm.reset();
    }

}
