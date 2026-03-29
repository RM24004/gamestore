package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "platform")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @OneToMany(mappedBy = "platform", cascade = CascadeType.ALL, orphanRemoval = true) // Relación bidireccional con Product borrando productos relacionados al eliminar una plataforma
    private List<Product> products; // Relación bidireccional con Product
}