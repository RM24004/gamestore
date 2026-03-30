package com.gamerstore.gamerstore.controller;
import com.gamerstore.gamerstore.dto.UserResponseDTO;
import com.gamerstore.gamerstore.dto.UserRequestDTO;
import com.gamerstore.gamerstore.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")

public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Obtener Todos los registros
    @GetMapping
    public List<UserResponseDTO> listAll() {
        return userService.getAllUsers();
    }

    //Obtener por ID
    @GetMapping("/{id}")
    public UserResponseDTO getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //Crear
    @PostMapping
    public UserResponseDTO save(@Valid @RequestBody UserRequestDTO dto) {
        return userService.createUser(dto);
    }

    //Actualizar
    @PutMapping("/{id}")
    public UserResponseDTO update(@PathVariable Long id, @Valid @RequestBody UserRequestDTO dto) {
        return userService.updateUser(id, dto);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
