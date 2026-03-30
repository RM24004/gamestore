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
    @Column(name = "id_country")
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    @NotBlank(message = "La descripción es obligatoria")
    private String description;

     @OneToMany(mappedBy = "country", cascade = CascadeType.ALL, orphanRemoval = true) // Relación bidireccional con Supplier borrando proveedores relacionados al eliminar un país
    private List<Supplier> suppliers; //
}