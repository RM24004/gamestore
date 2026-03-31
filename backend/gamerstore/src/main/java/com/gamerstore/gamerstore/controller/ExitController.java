package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ExitResponseDTO;
import com.gamerstore.gamerstore.dto.ExitRequestDTO;
import com.gamerstore.gamerstore.service.ExitService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/exits")
@CrossOrigin(origins = "*")
public class ExitController {
    private final ExitService exitService;
    public ExitController(ExitService exitService) {
        this.exitService = exitService;
    }
    //Obtener Todos los registros
    @GetMapping
    public List<ExitResponseDTO> listAll() {
        return exitService.getAllExits();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ExitResponseDTO getById(@PathVariable Long id) {
        return exitService.getExitById(id);
    }

    //Crear
    @PostMapping
    public ExitResponseDTO save(@Valid @RequestBody ExitRequestDTO dto) {
        return exitService.createExit(dto);
    }
    //Actualizar
    /*
    @PutMapping("/{id}")
    public ExitResponseDTO update(@PathVariable Long id, @Valid @RequestBody ExitRequestDTO dto) {
        return exitService.updateExit(id, dto);
    }
    */
    //Eliminar
    /*
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        exitService.deleteExit(id);
    }
    */
}
