package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.PecaModel;
import br.com.masterclass.superpecas.repository.CarroRepository;
import br.com.masterclass.superpecas.repository.PecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public PecaModel gravaPeca(PecaModel peca){
        PecaModel pecaModel = pecaRepository.findById(peca.getId()).orElse(null);

        if (pecaModel == null){
            return pecaRepository.save(peca);
        }

        return null;
    }

    public PecaModel editaPeca(PecaModel peca){
        PecaModel pecaModel = pecaRepository.findById(peca.getId()).orElse(null);

        if (pecaModel == null){
            return null;
        }

      //  CarroModel existeMesmoNome = pecaRepository.findByNomeModeloOrCodigoUnico(carro.getNomeModelo(), carro.getCodigoUnico());

      //  if (existeMesmoNome != null && existeMesmoNome.getId()!= carro.getId()){
      //      return null;
      //  }

        return pecaRepository.save(peca);
    }

    public void excluiPeca(int id){
        PecaModel pecaModel = pecaRepository.findById(id).orElse(null);
        if (pecaModel != null)
            pecaRepository.delete(pecaModel);
    }
}
