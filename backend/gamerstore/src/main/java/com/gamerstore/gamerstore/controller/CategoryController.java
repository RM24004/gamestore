package com.gamerstore.gamerstore.controller;

import com.gamerstore.gamerstore.dto.CategoryRequestDTO;
import com.gamerstore.gamerstore.dto.CategoryResponseDTO;
import com.gamerstore.gamerstore.service.CategoryService;
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
    public List<CategoryResponseDTO> listAll() {
        return categoryService.listAll();
    }

    //GET BY ID
    @GetMapping("/{id}")
    public CategoryResponseDTO getById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    //CREATE
    @PostMapping
    public CategoryResponseDTO save(@Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.save(dto);
    }

    //UPDATE
    @PutMapping("/{id}")
    public CategoryResponseDTO update(@PathVariable Long id, @Valid @RequestBody CategoryRequestDTO dto) {
        return categoryService.update(id, dto);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }

   
}


