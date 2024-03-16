import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { Carro } from '../model/carros.model';
import { Top10Fabricantes } from '../model/top10fabricantes.model';

@Injectable({
    providedIn: 'root'
})
export class CarrosService {
    constructor(private http: HttpClient) { }

    getCarro(id: number) {
        return this.http.get<Carro>(`${environment.host}/carro/${id}`);
    }

    getTodosCarros() {
        return this.http.get<Carro[]>(`${environment.host}/carro/listaTodos`);
    }

    getTodosCarrosPaginado(page: number = 0) {
        return this.http.get<Carro[]>(`${environment.host}/carro/listaTodosPaginado?page=${page}&size=10`);
    }

    getCarrosByTermo(termo: String, page: number = 0) {
        return this.http.get<Carro[]>(`${environment.host}/carro/listaTodosPaginado/${termo}?page=${page}&size=10`);
    }

    removerCarro(id: number) {
        return this.http.delete(`${environment.host}/carro/${id}`);
    }

    gravarCarro(carro: Carro): Observable<Carro> {
        return this.http.post<Carro>(`${environment.host}/carro`, carro);
    }

    atualizarCarro(carro: Carro): Observable<Carro> {
        return this.http.put<Carro>(`${environment.host}/carro`, carro);
    }

    getTodosFabricantes() {
        return this.http.get<String[]>(`${environment.host}/carro/listaTodosFabricantes`);
    }

    getTop10Fabricantes(){
        return this.http.get<Top10Fabricantes[]>(`${environment.host}/carro/listaTop10Fabricantes`);
    }

};