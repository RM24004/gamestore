package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.EntryResponseDTO;
import com.gamerstore.gamerstore.dto.EntryRequestDTO;
import com.gamerstore.gamerstore.service.EntryService;
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
    public List<EntryResponseDTO> listAll() {
        return entryService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public EntryResponseDTO getById(@PathVariable Long id) {
        return entryService.findEntryById(id);
    }

    //Crear
    @PostMapping
    public EntryResponseDTO save(@Valid @RequestBody EntryRequestDTO dto) {
        return entryService.createEntry(dto);
    }

    //Actualizar
    /*
    @PutMapping("/{id}")
    public EntryResponseDTO update(@PathVariable Long id, @Valid @RequestBody EntryRequestDTO dto) {
        return entryService.updateEntry(id, dto);
    }
    */
    //Eliminar
    /*
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        entryService.deleteEntry(id);
    }
    */
}
