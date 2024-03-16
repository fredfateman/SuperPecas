import { Component, ViewChild } from '@angular/core';
import { CarrosService } from '../../service/carros.service';
import { Carro } from '../../model/carros.model';
import { Subject, takeUntil } from 'rxjs';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../component/dialog.component';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrl: './carros.component.css'
})
export class CarrosComponent {
  @ViewChild('pp', { static: false })
  paginator!: Paginator;

  private unsubscribe = new Subject<void>;
  carro!: Carro[];
  termoPesquisa!: string;
  itemsCount: number = 0;
  page: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(private carrosService: CarrosService, private _notifications: NotificationsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pesquisarCarros();
  }

  pesquisarCarros(page: number = 0) {
    if (this.termoPesquisa == undefined || this.termoPesquisa == "") {
      this.carrosService.getTodosCarrosPaginado(page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((result: any) => {
          this.itemsCount = result.totalElements;
          this.carro = result.content;
        });
    } else {
      this.carrosService.getCarrosByTermo(this.termoPesquisa, page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((result: any) => {
          this.itemsCount = result.totalElements;
          this.carro = result.content;
        });
    }
  }

  removerCarro(carro: Carro) {
    const dialogRef = this.dialog.open(Dialog, {
      data: {
        texto: `Deseja realmente remover o carro <b>${carro.nomeModelo}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.carrosService.removerCarro(carro.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            next: () => {
              this._notifications.create("Sucesso", "Carro removido com sucesso", NotificationType.Success);
              this.pesquisarCarros();
            },
            error: (error) => {
              this._notifications.create("Erro", "Ocorreu um erro ao remover o carro", NotificationType.Error);
            }
          });
      }
    });

  }

  pesquisarPorTermo() {
    this.resetPage();
    this.pesquisarCarros();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = (event.first / 10);
    this.pesquisarCarros(this.page);
  }

  resetPage() {
    setTimeout(() => {
      this.first = 0;
      this.page = 0;
    }, 100);
  }

}
