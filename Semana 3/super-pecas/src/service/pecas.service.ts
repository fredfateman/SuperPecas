import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { Peca } from '../model/pecas.model';
import { Top10CarroComMaisPecas } from '../model/top10carros.model';

@Injectable({
    providedIn: 'root'
})
export class PecasService {
    constructor(private http: HttpClient) { }

    getPeca(id: number) {
        return this.http.get<Peca>(`${environment.host}/peca/${id}`);
    }

    getTodasPecas(page: number = 0) {
        return this.http.get<Peca[]>(`${environment.host}/peca/listaTodosPaginado?page=${page}&size=10`);
    }

    getPecasByNome(nome: String, page: number = 0) {
        return this.http.get<Peca[]>(`${environment.host}/peca/listaTodosPaginado/${nome}?page=${page}&size=10`);
    }

    removerPeca(id: number) {
        return this.http.delete(`${environment.host}/peca/${id}`);
    }

    gravarPeca(carro: Peca): Observable<Peca> {
        return this.http.post<Peca>(`${environment.host}/peca`, carro);
    }

    atualizarPeca(carro: Peca): Observable<Peca> {
        return this.http.put<Peca>(`${environment.host}/peca`, carro);
    }

    getTop10CarroComMaisPecas(){
        return this.http.get<Top10CarroComMaisPecas[]>(`${environment.host}/peca/listaTop10CarroComMaisPecas`);
    }

};