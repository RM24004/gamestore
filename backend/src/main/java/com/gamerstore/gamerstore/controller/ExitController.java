package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.ExitResponseDTO;
import com.gamerstore.gamerstore.dto.ApiResponse;
import com.gamerstore.gamerstore.dto.ExitRequestDTO;
import com.gamerstore.gamerstore.service.ExitService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<ExitResponseDTO>> getAll() {
        List<ExitResponseDTO> exits = exitService.getAllExits();
        return new ResponseEntity<>(exits, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<ExitResponseDTO> getById(@PathVariable Long id) {
        ExitResponseDTO exit = exitService.getExitById(id);
        return new ResponseEntity<>(exit, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<ApiResponse> save(@Valid @RequestBody ExitRequestDTO dto) {
        exitService.createExit(dto);
        return ResponseEntity.ok(new ApiResponse("Salida creada con exito"));
    }
    //Actualizar
    /*
    @PutMapping("/{id}")
    public ResponseEntity<ExitResponseDTO> update(@PathVariable Long id, @Valid @RequestBody ExitRequestDTO dto) {
        ExitResponseDTO updatedExit = exitService.updateExit(id, dto);
        return new ResponseEntity<>(updatedExit, HttpStatus.OK);
    }
    */
    //Eliminar
    /*
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        exitService.deleteExit(id);
        return ResponseEntity.noContent().build();
    }
    */
}
