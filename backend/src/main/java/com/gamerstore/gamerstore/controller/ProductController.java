package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ProductResponseDTO;
import com.gamerstore.gamerstore.dto.ApiResponse;
import com.gamerstore.gamerstore.dto.ProductRequestDTO;
import com.gamerstore.gamerstore.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<ProductResponseDTO>> getAll() {
        List<ProductResponseDTO> products = productService.listAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getById(@PathVariable Long id) {
        ProductResponseDTO product = productService.findById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    //Crear
    @PostMapping
    public ResponseEntity<ApiResponse> save(@Valid @RequestBody ProductRequestDTO dto) {
        productService.save(dto);
        return ResponseEntity.ok(new ApiResponse("Producto creado con exito"));
    }
    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO dto) {
        productService.update(id, dto);
        return ResponseEntity.ok(new ApiResponse("Producto actualizado con exito"));
    }
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok(new ApiResponse("Producto eliminado correctamente"));
    }
}
