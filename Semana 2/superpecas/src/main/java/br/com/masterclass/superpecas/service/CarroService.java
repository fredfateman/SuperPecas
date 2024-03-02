package br.com.masterclass.superpecas.service;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.PecaModel;
import br.com.masterclass.superpecas.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarroService {

    @Autowired
    CarroRepository carroRepository;

    @Autowired
    PecaService pecaService;

    public CarroModel buscaCarro(int id){
        return carroRepository.findById(id).orElse(null);
    }

    public List<CarroModel> listaCarros(){
        return (List<CarroModel>) carroRepository.findAll();
    }

    public Page<CarroModel> listaCarrosPaginado(Pageable pageable){
        return carroRepository.findAll(pageable);
    }

    public Page<CarroModel> listaCarrosPorNomeEOuFabricantePaginado(String nome, String fabricante, Pageable pageable){
        return carroRepository.findByNomeModeloEOuFabricante(nome, fabricante, pageable);
    }

    public CarroModel gravaCarro(CarroModel carro){
        CarroModel carroModel = carroRepository.findByNomeModeloOrCodigoUnico(carro.getNomeModelo(), carro.getCodigoUnico());

        if (carroModel == null){
            return carroRepository.save(carro);
        }

        return null;
    }

    public CarroModel editaCarro(CarroModel carro){
        CarroModel carroModel = carroRepository.findById(carro.getId()).orElse(null);

        if (carroModel == null){
            return null;
        }

        CarroModel existeMesmoNome = carroRepository.findByNomeModeloOrCodigoUnico(carro.getNomeModelo(), carro.getCodigoUnico());

        if (existeMesmoNome != null && existeMesmoNome.getId()!= carro.getId()){
            return null;
        }

        return carroRepository.save(carro);
    }

    public boolean excluiCarro(int id){
        CarroModel carroModel = carroRepository.findById(id).orElse(null);
        List<PecaModel> existePeca = pecaService.listaPecasPorFabricante(carroModel.getId());

        if (existePeca.isEmpty()){
            carroRepository.delete(carroModel);
            return true;
        } else {
            return false;
        }
    }
}
