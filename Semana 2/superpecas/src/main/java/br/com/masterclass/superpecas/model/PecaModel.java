package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Pecas")
public class PecaModel {

    @Id
    @Column(name = "PecaID", nullable = false)
    int id;

    @Column(name = "Nome", nullable = false)
    String nome;

    @Column(name = "Descricao", nullable = false)
    String descricao;

    @Column(name = "NumeroSerie", nullable = false)
    String numeroSerie;

    @Column(name = "Fabricante", nullable = false)
    String fabricante;

    @Column(name = "ModeloCarro", nullable = false)
    String modeloCarro;

    @OneToOne(optional = false)
    @JoinColumn(name = "CarroID", nullable = false)
    CarroModel carroModel;
}
