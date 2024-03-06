import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { Carro } from '../model/carros.model';

@Injectable({
    providedIn: 'root'
})
export class CarrosService {
    constructor(private http: HttpClient) { }

    getCarro(id: number) {
        return this.http.get<Carro>(`${environment.host}/carro/${id}`);
    }

    getTodosCarros(page: number = 0) {
        return this.http.get<Carro[]>(`${environment.host}/carro/listaTodosPaginado?page=${page}&size=10`);
    }

    getCarrosByNomeModelo(nomeModelo: String, page: number = 0) {
        return this.http.get<Carro[]>(`${environment.host}/carro/listaTodosPaginado/${nomeModelo}?page=${page}&size=10`);
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

};