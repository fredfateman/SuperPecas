package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.controller.CarroController;
import br.com.masterclass.superpecas.model.CarroModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarroRepository extends JpaRepository<CarroModel, Integer> {

    public CarroModel findByNomeModelo(String nomeModelo);

    public CarroModel findByNomeModeloOrCodigoUnico(String nomeModelo, String codigoUnico);

}
