package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "brand")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_brand")
    private Long id;

    @NotBlank(message = "Nombre es obligatorio")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Descripción es obligatoria")
    @Size(max = 255)
    private String description;

    @OneToMany(mappedBy = "brand")
    private List<Product> products; // Relación bidireccional con Product
}