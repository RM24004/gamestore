package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.EntryResponseDTO;
import com.gamerstore.gamerstore.dto.ApiResponse;
import com.gamerstore.gamerstore.dto.EntryRequestDTO;
import com.gamerstore.gamerstore.service.EntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/entries")
@CrossOrigin(origins = "*")
public class EntryController {
    private final EntryService entryService;
    public EntryController(EntryService entryService) {
        this.entryService = entryService;
    }
    //Obtener Todos los registros
    @GetMapping
    public ResponseEntity<List<EntryResponseDTO>> getAll() {
        List<EntryResponseDTO> entries = entryService.listAll();
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<EntryResponseDTO> getById(@PathVariable Long id) {
        EntryResponseDTO entry = entryService.findEntryById(id);
        return new ResponseEntity<>(entry, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<ApiResponse> save(@Valid @RequestBody EntryRequestDTO dto) {
        entryService.createEntry(dto);
        return ResponseEntity.ok(new ApiResponse("Entrada creada con exito"));
    }

    //Actualizar
    /*
    @PutMapping("/{id}")
    public ResponseEntity<EntryResponseDTO> update(@PathVariable Long id, @Valid @RequestBody EntryRequestDTO dto) {
        EntryResponseDTO updatedEntry = entryService.updateEntry(id, dto);
        return new ResponseEntity<>(updatedEntry, HttpStatus.OK);
    }
    */
    //Eliminar
    /*
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        entryService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
    */
}
