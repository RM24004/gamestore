package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.CountryRequestDTO;
import com.gamerstore.gamerstore.service.CountryService;
import com.gamerstore.gamerstore.dto.CountryResponseDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "*")

public class CountryController {
    private final CountryService countryService;
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }
    //Obtener Todos los registros
    @GetMapping
    public List<CountryResponseDTO> listAll() {
        return countryService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public CountryResponseDTO getById(@PathVariable Long id) {
        return countryService.findById(id);
    }

    //Crear
    @PostMapping
    public CountryResponseDTO save(@Valid @RequestBody CountryRequestDTO dto) {
        return countryService.save(dto);
    }

    //Actualizar
    @PutMapping("/{id}")
    public CountryResponseDTO update(@PathVariable Long id, @Valid @RequestBody CountryRequestDTO dto) {
        return countryService.update(id, dto);
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        countryService.delete(id);
    }
}
