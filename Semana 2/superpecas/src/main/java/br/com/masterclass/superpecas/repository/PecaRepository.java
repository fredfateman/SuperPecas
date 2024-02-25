package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.PecaModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PecaRepository extends JpaRepository<PecaModel, Integer> {

}
