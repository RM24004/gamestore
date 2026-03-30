package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.PlatformRequestDTO;
import com.gamerstore.gamerstore.dto.PlatformResponseDTO;
import com.gamerstore.gamerstore.service.PlatformService;
import org.springframework.http.ResponseEntity;
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
    public List<PlatformResponseDTO> listAll() {
        return platformService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<PlatformResponseDTO> getById(@PathVariable Long id) {
        try {
            PlatformResponseDTO dto = platformService.findById(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Crear
    @PostMapping
    public ResponseEntity<PlatformResponseDTO> save(@RequestBody PlatformRequestDTO dto) {
        try {
            PlatformResponseDTO savedDto = platformService.save(dto);
            return ResponseEntity.ok(savedDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<PlatformResponseDTO> update(@PathVariable Long id, @RequestBody PlatformRequestDTO dto) {
        try {
            PlatformResponseDTO updatedDto = platformService.update(id, dto);
            return ResponseEntity.ok(updatedDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } 
    }  
    //Eliminar
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id) {
            try {
                platformService.delete(id);
                return ResponseEntity.noContent().build();
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }                                         
    
        }
}
