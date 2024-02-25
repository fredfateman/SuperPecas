package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/carro")
public class CarroController {

    @Autowired
    CarroService carroService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public CarroModel buscaCarro(@PathVariable int id) {
       CarroModel carroModel = carroService.buscaCarro(id);
       return carroModel;
    }

}
