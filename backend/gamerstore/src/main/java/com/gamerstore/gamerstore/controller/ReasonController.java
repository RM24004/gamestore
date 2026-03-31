package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ReasonRequestDTO;
import com.gamerstore.gamerstore.dto.ReasonResponseDTO;
import com.gamerstore.gamerstore.service.ReasonService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<ReasonResponseDTO>> listAll() {
        List<ReasonResponseDTO> reasons = reasonService.listAll();
        return new ResponseEntity<>(reasons, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<ReasonResponseDTO> getById(@PathVariable Long id) {
        ReasonResponseDTO reason = reasonService.findById(id);
        return new ResponseEntity<>(reason, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<ReasonResponseDTO> save(@Valid @RequestBody ReasonRequestDTO dto) {
        ReasonResponseDTO savedReason = reasonService.save(dto);
        return new ResponseEntity<>(savedReason, HttpStatus.CREATED);
    }
    
    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<ReasonResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ReasonRequestDTO dto) {
        ReasonResponseDTO updatedReason = reasonService.update(id, dto);
        return new ResponseEntity<>(updatedReason, HttpStatus.OK);
    }   

    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reasonService.delete(id);
        return ResponseEntity.noContent().build();
    }   
}
