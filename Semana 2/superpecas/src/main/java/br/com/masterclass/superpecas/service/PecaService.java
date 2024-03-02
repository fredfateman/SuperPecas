package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.PecaModel;
import br.com.masterclass.superpecas.repository.CarroRepository;
import br.com.masterclass.superpecas.repository.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PecaService {

    @Autowired
    PecaRepository pecaRepository;

    public PecaModel buscaPeca(int id){
        return pecaRepository.findById(id).orElse(null);
    }

    public List<PecaModel> listaPecas(){
        return  pecaRepository.findAll();
    }

    public Page<PecaModel> listaPecasPaginado(Pageable pageable){
        return pecaRepository.findAll(pageable);
    }

    public Page<PecaModel> listaPecasPorNomeEOuNumeroSerie(String nome, String numeroSerie, Pageable pageable){
        return pecaRepository.findByNomeOrNumeroSerie(nome, numeroSerie, pageable);
    }

    public PecaModel gravaPeca(PecaModel peca){
        PecaModel pecaModel = pecaRepository.findByNomeOrNumeroSerie(peca.getNome(), peca.getNumeroSerie());

        if (pecaModel == null){
            return pecaRepository.save(peca);
        }

        return null;
    }

    public PecaModel editaPeca(PecaModel peca){
        PecaModel existeMesmoNome = pecaRepository.findByNomeOrNumeroSerie(peca.getNome(), peca.getNumeroSerie());

        if (existeMesmoNome != null && existeMesmoNome.getId()!= peca.getId()){
            return null;
        }

        return pecaRepository.save(peca);
    }

    public void excluiPeca(int id){
        PecaModel pecaModel = pecaRepository.findById(id).orElse(null);
        if (pecaModel != null)
            pecaRepository.delete(pecaModel);
    }

    public List<PecaModel> listaPecasPorFabricante(int carroId){
        return pecaRepository.findByCarroId(carroId);
    }

}
