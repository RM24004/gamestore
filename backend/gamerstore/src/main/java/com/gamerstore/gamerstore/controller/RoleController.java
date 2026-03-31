package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.RoleRequestDTO;
import com.gamerstore.gamerstore.dto.RoleResponseDTO;
import com.gamerstore.gamerstore.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "*")
public class RoleController {
    private final RoleService roleService;
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    //Obtener Todos los registros
    @GetMapping
    public ResponseEntity<List<RoleResponseDTO>> listAll() {
        List<RoleResponseDTO> roles = roleService.listAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> getById(@PathVariable Long id) {
        RoleResponseDTO role = roleService.findById(id);
        return new ResponseEntity<>(role, HttpStatus.OK);
    }

    //Crear
    @PostMapping
    public ResponseEntity<RoleResponseDTO> save(@Valid @RequestBody RoleRequestDTO dto) {
        RoleResponseDTO savedRole = roleService.save(dto);
        return new ResponseEntity<>(savedRole, HttpStatus.CREATED);
    }

    //Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> update(@PathVariable Long id, @Valid @RequestBody RoleRequestDTO dto) {
        RoleResponseDTO updatedRole = roleService.update(id, dto);
        return new ResponseEntity<>(updatedRole, HttpStatus.OK);
    }
    
    //Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
