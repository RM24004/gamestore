package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.BrandRequestDTO;
import com.gamerstore.gamerstore.dto.BrandResponseDTO;
import com.gamerstore.gamerstore.service.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/brands")
@CrossOrigin(origins = "*")

public class BrandController {
    private final BrandService brandService;
    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }
    
    //Obtener Todos los registros
    @GetMapping
    public ResponseEntity<List<BrandResponseDTO>> getAll() {
        List<BrandResponseDTO> brands = brandService.listAll();
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> getById(@PathVariable Long id) {
        BrandResponseDTO brand = brandService.findById(id);
        return new ResponseEntity<>(brand, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<BrandResponseDTO> save(@Valid @RequestBody BrandRequestDTO dto) {
        BrandResponseDTO savedBrand = brandService.save(dto);
        return new ResponseEntity<>(savedBrand, HttpStatus.CREATED);
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> update(@PathVariable Long id, @Valid @RequestBody BrandRequestDTO dto) {
        BrandResponseDTO updatedBrand = brandService.update(id, dto);
        return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
