package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.CountryRequestDTO;
import com.gamerstore.gamerstore.service.CountryService;
import com.gamerstore.gamerstore.dto.CountryResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<CountryResponseDTO>> getAll() {
        List<CountryResponseDTO> countries = countryService.listAll();
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }
    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<CountryResponseDTO> getById(@PathVariable Long id) {
        CountryResponseDTO country = countryService.findById(id);
        return new ResponseEntity<>(country, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<CountryResponseDTO> save(@Valid @RequestBody CountryRequestDTO dto) {
        CountryResponseDTO savedCountry = countryService.save(dto);
        return new ResponseEntity<>(savedCountry, HttpStatus.CREATED);
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<CountryResponseDTO> update(@PathVariable Long id, @Valid @RequestBody CountryRequestDTO dto) {
        CountryResponseDTO updatedCountry = countryService.update(id, dto);
        return new ResponseEntity<>(updatedCountry, HttpStatus.OK);
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        countryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
