import { Carro } from "./carros.model";

export interface Peca {
    id: number;
    nome: string;
    descricao: string;
    numeroSerie: string;
    fabricante: string;
    modeloCarro: string;
    carro: Carro;
}