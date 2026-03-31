package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ProductResponseDTO;
import com.gamerstore.gamerstore.dto.ProductRequestDTO;
import com.gamerstore.gamerstore.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    //Obtener Todos los registros
    @GetMapping
    public List<ProductResponseDTO> listAll() {
        return productService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ProductResponseDTO getById(@PathVariable Long id) {
        return productService.findById(id);
    }
    //Crear
    @PostMapping
    public ProductResponseDTO save(@Valid @RequestBody ProductRequestDTO dto) {
        return productService.save(dto);
    }
    //Actualizar
    @PutMapping("/{id}")
    public ProductResponseDTO update(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO dto) {
        return productService.update(id, dto);
    }
    //Eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}
