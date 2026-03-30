package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.BrandRequestDTO;
import com.gamerstore.gamerstore.dto.BrandResponseDTO;
import com.gamerstore.gamerstore.service.BrandService;
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
    public List<BrandResponseDTO> listAll() {
        return brandService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public BrandResponseDTO getById(@PathVariable Long id) {
        return brandService.findById(id);
    }

    //Crear
    @PostMapping
    public BrandResponseDTO save(@Valid @RequestBody BrandRequestDTO dto) {
        return brandService.save(dto);
    }

    //Actualizar
    @PutMapping("/{id}")
    public BrandResponseDTO update(@PathVariable Long id, @Valid @RequestBody BrandRequestDTO dto) {
        return brandService.update(id, dto);
    }           
}
