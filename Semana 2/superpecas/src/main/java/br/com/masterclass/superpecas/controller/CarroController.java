package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.CarroModel;
import br.com.masterclass.superpecas.model.DTO.CarroDTO;
import br.com.masterclass.superpecas.service.CarroService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carro")
public class CarroController {

    @Autowired
    CarroService carroService;

    @Autowired
    ModelMapper modelMapper;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<CarroDTO> buscaCarro(@PathVariable int id) {
       CarroModel carroModel = carroService.buscaCarro(id);

       if (carroModel == null){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }

       return new ResponseEntity<>(modelMapper.map(carroModel, CarroDTO.class), HttpStatus.OK);
    }

    @RequestMapping(value = "/listaTodos", method = RequestMethod.GET)
    public ResponseEntity<List<CarroDTO>> listaCarros() {
        List<CarroModel> carros = carroService.listaCarros();
        List<CarroDTO> listaDTO = Arrays.asList(modelMapper.map(carros, CarroDTO[].class));

        return new ResponseEntity<>(listaDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CarroDTO> gravaCarro(@RequestBody CarroDTO data) {
        CarroModel carroModel = modelMapper.map(data, CarroModel.class);
        carroModel = carroService.gravaCarro(carroModel);

        if (carroModel == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(modelMapper.map(carroModel, CarroDTO.class), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<CarroDTO> editaCarro(@RequestBody CarroDTO data) {
        CarroModel carroModel = modelMapper.map(data, CarroModel.class);
        carroModel = carroService.editaCarro(carroModel);

        if (carroModel == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(modelMapper.map(carroModel, CarroDTO.class), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity editaCarro(@PathVariable int id) {
        carroService.excluiCarro(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
