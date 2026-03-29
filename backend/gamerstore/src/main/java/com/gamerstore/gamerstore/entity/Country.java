package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "country")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

     @OneToMany(mappedBy = "country", cascade = CascadeType.ALL, orphanRemoval = true) // Relación bidireccional con Supplier borrando proveedores relacionados al eliminar un país
    private List<Supplier> suppliers; //
}