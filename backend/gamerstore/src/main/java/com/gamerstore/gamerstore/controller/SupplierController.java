package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.SupplierResponseDTO;
import com.gamerstore.gamerstore.dto.SupplierRequestDTO;
import com.gamerstore.gamerstore.service.SupplierService;
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
    public List<SupplierResponseDTO> listAll() {
        return supplierService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public SupplierResponseDTO getById(@PathVariable Long id) {
        return supplierService.findById(id);
    }

    //Crear
    @PostMapping
    public SupplierResponseDTO save(@Valid @RequestBody SupplierRequestDTO dto) {
        return supplierService.save(dto);
    }

    //Actualizar
    @PutMapping("/{id}")
    public SupplierResponseDTO update(@PathVariable Long id, @Valid @RequestBody SupplierRequestDTO dto) {
        return supplierService.update(id, dto);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        supplierService.delete(id);
    }                   
}
