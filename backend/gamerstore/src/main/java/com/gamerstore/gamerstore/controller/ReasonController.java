package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ReasonRequestDTO;
import com.gamerstore.gamerstore.dto.ReasonResponseDTO;
import com.gamerstore.gamerstore.service.ReasonService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reasons")
@CrossOrigin(origins = "*")

public class ReasonController {
    private final ReasonService reasonService;
    public ReasonController(ReasonService reasonService) {
        this.reasonService = reasonService;
    }
    //Obtener Todos los registros
    @GetMapping
    public List<ReasonResponseDTO> listAll() {
        return reasonService.listAll();
    }
    //Obtener por ID
    @GetMapping("/{id}")
    public ReasonResponseDTO getById(@PathVariable Long id) {
        return reasonService.findById(id);
    }
    //Crear
    @PostMapping
    public ReasonResponseDTO save(@Valid @RequestBody ReasonRequestDTO dto) {
        return reasonService.save(dto);
    }
    //Actualizar
    @PutMapping("/{id}")
    public ReasonResponseDTO update(@PathVariable Long id, @Valid @RequestBody ReasonRequestDTO dto) {
        return reasonService.update(id, dto);
    }   

    //Eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reasonService.delete(id);
    }
    
}
