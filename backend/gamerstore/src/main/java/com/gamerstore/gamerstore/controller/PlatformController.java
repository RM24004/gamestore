package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.PlatformRequestDTO;
import com.gamerstore.gamerstore.dto.PlatformResponseDTO;
import com.gamerstore.gamerstore.service.PlatformService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/platforms")
@CrossOrigin(origins = "*")
public class PlatformController {
    private final PlatformService platformService;
    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    //Obtener Todos los registros
    @GetMapping
    public ResponseEntity<List<PlatformResponseDTO>> getAll() {
        List<PlatformResponseDTO> platforms = platformService.listAll();
        return new ResponseEntity<>(platforms, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<PlatformResponseDTO> getById(@PathVariable Long id) {
        PlatformResponseDTO platform = platformService.findById(id);
        return new ResponseEntity<>(platform, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<PlatformResponseDTO> save(@RequestBody PlatformRequestDTO dto) {
        PlatformResponseDTO savedDto = platformService.save(dto);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<PlatformResponseDTO> update(@PathVariable Long id, @RequestBody PlatformRequestDTO dto) {
        PlatformResponseDTO updatedDto = platformService.update(id, dto);
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        platformService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
