package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.controller.CarroController;
import br.com.masterclass.superpecas.model.CarroModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository extends JpaRepository<CarroModel, Integer> {


}
