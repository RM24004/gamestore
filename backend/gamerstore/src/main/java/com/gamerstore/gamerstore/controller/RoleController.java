package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.RoleRequestDTO;
import com.gamerstore.gamerstore.dto.RoleResponseDTO;
import com.gamerstore.gamerstore.service.RoleService;
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
    public List<RoleResponseDTO> listAll() {
        return roleService.listAll();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public RoleResponseDTO getById(@PathVariable Long id) {
        return roleService.findById(id);
    }

    //Crear
    @PostMapping
    public RoleResponseDTO save(@Valid @RequestBody RoleRequestDTO dto) {
        return roleService.save(dto);
    }

    //Actualizar
    @PutMapping("/{id}")
    public RoleResponseDTO update(@PathVariable Long id, @Valid @RequestBody RoleRequestDTO dto) {
        return roleService.update(id, dto);
    }                               
}
