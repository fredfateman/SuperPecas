import { Component } from '@angular/core';
import { Peca } from '../../model/pecas.model';
import { Subject, takeUntil } from 'rxjs';
import { PecasService } from '../../service/pecas.service';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../component/dialog.component';

@Component({
  selector: 'app-pecas',
  templateUrl: './pecas.component.html',
  styleUrl: './pecas.component.css'
})
export class PecasComponent {

  private unsubscribe = new Subject<void>;
  peca!: Peca[];
  termoPesquisa!: string;
  itemsCount: number = 0;
  page: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(private pecasService: PecasService, private _notifications: NotificationsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pesquisarPecas();
  }

  pesquisarPorTermo() {
    this.resetPage();
    this.pesquisarPecas();
  }

  pesquisarPecas(page: number = 0) {
    this.page = 0;
    if (this.termoPesquisa == undefined || this.termoPesquisa == "") {
      this.pecasService.getTodasPecas(page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (result: any) => {
            this.itemsCount = result.totalElements;
            this.peca = result.content;
          },
          error: (error) => {
            this._notifications.create("Erro", error.error, NotificationType.Error);
          }
        });
    } else {
      this.pecasService.getPecasByTermo(this.termoPesquisa, page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (result: any) => {
            this.itemsCount = result.totalElements;
            this.peca = result.content;
          },
          error: (error) => {
            this._notifications.create("Erro", "Ocorreu um erro ao remover a peça", NotificationType.Error);
          }
        });
    }
  }

  removerPeca(peca: Peca) {
    const dialogRef = this.dialog.open(Dialog, {
      data: {
        texto: `Deseja realmente remover a peça <b>${peca.nome}</b>?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.pecasService.removerPeca(peca.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            next: () => {
              this._notifications.create("Sucesso", "Peça removida com sucesso", NotificationType.Success);
              this.pesquisarPecas();
            },
            error: (error) => {
              this._notifications.create("Erro", error.error, NotificationType.Error);
            }
          });
      }
    });
  }

  resetPage() {
    setTimeout(() => {
      this.first = 0;
      this.page = 0;
    }, 100);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = (event.first / 10);
    this.pesquisarPecas(this.page);
  }
}
