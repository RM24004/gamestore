package com.gamerstore.gamerstore.service;

import com.gamerstore.gamerstore.entity.Category;
import com.gamerstore.gamerstore.repository.CategoryRepository;
import com.gamerstore.gamerstore.dto.CategoryRequestDTO;
import com.gamerstore.gamerstore.dto.CategoryResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CategoryService {
     private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //Entity → DTO
    private CategoryResponseDTO toDTO(Category c) {
        return new CategoryResponseDTO(
                c.getId(),
                c.getName(),
                c.getDescription()
        );
    }

    //DTO → Entity
    private Category toEntity(CategoryRequestDTO dto) {
        Category c = new Category();
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());
        return c;
    }

    //Crear
    public CategoryResponseDTO save(CategoryRequestDTO dto) {
        Category c = toEntity(dto);
        c.setId(null);
        return toDTO(categoryRepository.save(c));
    }

    //Todos los registros
    public List<CategoryResponseDTO> listAll() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Buscar por ID
    public CategoryResponseDTO findById(Long id) {
        Category c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
        return toDTO(c);
    }

    //Actualizar
    public CategoryResponseDTO update(Long id, CategoryRequestDTO dto) {
        Category c = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));

        c.setName(dto.getName());
        c.setDescription(dto.getDescription());

        return toDTO(categoryRepository.save(c));
    }

    //Eliminar
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Categoria no encontrada");
        }
        categoryRepository.deleteById(id);
    }
}
