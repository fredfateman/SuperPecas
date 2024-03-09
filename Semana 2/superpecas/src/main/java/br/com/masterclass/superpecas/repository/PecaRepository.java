package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.DTO.TopCarroPecasDTO;
import br.com.masterclass.superpecas.model.DTO.TopFabricantesDTO;
import br.com.masterclass.superpecas.model.PecaModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PecaRepository extends JpaRepository<PecaModel, Integer> {
    public PecaModel findByNomeOrNumeroSerie(String nome, String numeroSerie);

    Page<PecaModel> findAll(Pageable pageable);

    @Query(value = "SELECT c FROM PecaModel c WHERE lower(c.nome) like lower(concat('%', ?1,'%')) AND (?2 IS NULL OR lower(c.numeroSerie) like lower(concat('%', ?2,'%')))")
    Page<PecaModel> findByNomeOrNumeroSerie(String nome, String numeroSerie, Pageable pageable);

    List<PecaModel> findByCarroId(int carroId);

    @Query(nativeQuery = true, value = "SELECT Count(pe.PecaId) 'quantidade', CONCAT(ca.NomeModelo, '/', ca.Fabricante) 'carro' FROM Pecas pe "
        + "INNER JOIN Carros ca ON ca.CarroId = pe.CarroId "
        + "GROUP BY ca.NomeModelo, ca.Fabricante ORDER BY Count(pe.PecaId) DESC LIMIT 10")
    List<TopCarroPecasDTO> findTop10CarrosComMaisPecas();
}
