package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;
@Entity
@Table(name = "reason")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reason")
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @OneToMany(mappedBy = "reason", cascade = CascadeType.ALL, orphanRemoval = true) // Relación bidireccional con Exit borrando salidas relacionadas al eliminar una razón
    private List<Exit> exits; // Relación bidireccional con Exit
}