package com.gamerstore.gamerstore.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email invalido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "El telefono es obligatorio")
    @Size(max = 20)
    private String phone;

    @Size(min = 6, max = 10, message = "La contraseña debe tener entre 6 y 10 caracteres")
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    @ManyToOne
    @JoinColumn(name = "id_role", nullable = false) // Asegura que cada usuario tenga un rol asignado
    private Role role;
}
