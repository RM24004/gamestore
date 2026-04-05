package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ApiResponse;
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
    public ResponseEntity<ApiResponse> save(@Valid @RequestBody CountryRequestDTO dto) {
        countryService.save(dto);
        return ResponseEntity.ok(new ApiResponse("Pais creado con exito"));
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody CountryRequestDTO dto) {
        countryService.update(id, dto);
        return ResponseEntity.ok(new ApiResponse("Pais actualizado con exito"));
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        countryService.delete(id);
        return ResponseEntity.ok(new ApiResponse("Pais eliminado con exito"));
    }
}
