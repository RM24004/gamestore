package com.gamerstore.gamerstore.controller;

import com.gamerstore.gamerstore.dto.ApiResponse;
import com.gamerstore.gamerstore.dto.CategoryRequestDTO;
import com.gamerstore.gamerstore.dto.CategoryResponseDTO;
import com.gamerstore.gamerstore.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*")

public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    //GET ALL
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAll() {
        List<CategoryResponseDTO> categories = categoryService.listAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    //GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getById(@PathVariable Long id) {
        CategoryResponseDTO category = categoryService.findById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    //CREATE
    @PostMapping
    public ResponseEntity<ApiResponse> save(@Valid @RequestBody CategoryRequestDTO dto) {
        categoryService.save(dto);
        return ResponseEntity.ok(new ApiResponse("Categoria Creada con Exito"));
    }

    //UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @Valid @RequestBody CategoryRequestDTO dto) {
        categoryService.update(id, dto);
        return ResponseEntity.ok(new ApiResponse("Categoria actualizada con exito"));
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(new ApiResponse("Categoria eliminada con exito"));
    }
}


