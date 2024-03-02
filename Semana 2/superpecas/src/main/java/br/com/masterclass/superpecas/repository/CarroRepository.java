package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.CarroModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CarroRepository extends CrudRepository<CarroModel, Integer> {

    public CarroModel findByNomeModelo(String nomeModelo);

    public CarroModel findByNomeModeloOrCodigoUnico(String nomeModelo, String codigoUnico);

    Page<CarroModel> findAll(Pageable pageable);

    @Query(value = "SELECT c FROM CarroModel c WHERE lower(c.nomeModelo) like lower(concat('%', ?1,'%')) AND (?2 IS NULL OR lower(c.fabricante) like lower(concat('%', ?2,'%')))")
    Page<CarroModel> findByNomeModeloEOuFabricante(String nome, String fabricante, Pageable pageable);

}
