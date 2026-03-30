package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.User;
import com.gamerstore.gamerstore.entity.Role;
import com.gamerstore.gamerstore.repository.UserRepository;
import com.gamerstore.gamerstore.repository.RoleRepository;
import com.gamerstore.gamerstore.dto.RoleResponseDTO;
import com.gamerstore.gamerstore.dto.UserRequestDTO;
import com.gamerstore.gamerstore.dto.UserResponseDTO;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
}
   //Entidad a ResponseDTO
    private UserResponseDTO mapToResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        RoleResponseDTO roleDTO = new RoleResponseDTO();
        roleDTO.setId(user.getRole().getId());
        roleDTO.setName(user.getRole().getName());
        dto.setRoleName(roleDTO.getName());

        return dto;
    }

    //RequestDTO a Entidad
    private User mapToEntity(UserRequestDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword());

        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        user.setRole(role);
        return user;
    }

    //crear
    public UserResponseDTO createUser(UserRequestDTO dto) {
        User user = mapToEntity(dto);
        User savedUser = userRepository.save(user);
        return mapToResponseDTO(savedUser);
    }

    //listar todos
    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToResponseDTO).toList();
    }

    //obtener por id
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapToResponseDTO(user);
    }

    //actualizar
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        existingUser.setName(dto.getName());
        existingUser.setEmail(dto.getEmail());
        existingUser.setPhone(dto.getPhone());
        existingUser.setPassword(dto.getPassword());

        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        existingUser.setRole(role);
        User updatedUser = userRepository.save(existingUser);
        return mapToResponseDTO(updatedUser);
    }

    //eliminar
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userRepository.delete(user);
    }
}
