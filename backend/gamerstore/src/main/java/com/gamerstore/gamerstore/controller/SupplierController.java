package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.SupplierResponseDTO;
import com.gamerstore.gamerstore.dto.SupplierRequestDTO;
import com.gamerstore.gamerstore.service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "*")

public class SupplierController {
 private final SupplierService supplierService;
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    //Obtener Todos los registros
    @GetMapping
    public ResponseEntity<List<SupplierResponseDTO>> listAll() {
        List<SupplierResponseDTO> suppliers = supplierService.listAll();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> getById(@PathVariable Long id) {
        SupplierResponseDTO supplier = supplierService.findById(id);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<SupplierResponseDTO> save(@Valid @RequestBody SupplierRequestDTO dto) {
        SupplierResponseDTO savedSupplier = supplierService.save(dto);
        return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED);
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> update(@PathVariable Long id, @Valid @RequestBody SupplierRequestDTO dto) {
        SupplierResponseDTO updatedSupplier = supplierService.update(id, dto);
        return new ResponseEntity<>(updatedSupplier, HttpStatus.OK);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        supplierService.delete(id);
        return ResponseEntity.noContent().build();
    }                  
}
