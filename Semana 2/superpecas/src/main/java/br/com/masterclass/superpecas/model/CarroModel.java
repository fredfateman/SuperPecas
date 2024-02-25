package br.com.masterclass.superpecas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Carros")
public class CarroModel {

    @Id
    @Column(name = "CarroID", nullable = false)
    int id;
    @Column(name = "NomeModelo", nullable = false)
    String nomeModelo;
    @NotNull
    String fabricante;
    @Column(name = "CodigoUnico", nullable = false)
    String codigoUnico;
}
