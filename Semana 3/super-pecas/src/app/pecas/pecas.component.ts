import { Component } from '@angular/core';
import { Peca } from '../../model/pecas.model';
import { Subject, takeUntil } from 'rxjs';
import { PecasService } from '../../service/pecas.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog } from '@angular/material/dialog';

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
    this.pesquisarPecasPorNome();
  }

  pesquisarPecasPorNome(page: number = 0) {
    this.page = 0;
    if (this.termoPesquisa == undefined || this.termoPesquisa == "") {
      this.pecasService.getTodasPecas(page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((result: any) => {
          this.itemsCount = result.totalElements;
          this.peca = result.content;
        });
    } else {
      this.pecasService.getPecasByNome(this.termoPesquisa, page)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((result: any) => {
          this.itemsCount = result.totalElements;
          this.peca = result.content;
        });
    }
  }

  removerPeca(id: number) {
    // const dialogRef = this.dialog.open(RemoverCarroDialog, {
    //   data: {
    //     id: id
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == true) {
    //     this._notifications.create("Sucesso", "Carro removido com sucesso", NotificationType.Success);
    //     this.pesquisarPecasPorNome();
    //   }
    // });

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = (event.first / 10);
    this.pesquisarPecasPorNome(this.page);
  }

}
