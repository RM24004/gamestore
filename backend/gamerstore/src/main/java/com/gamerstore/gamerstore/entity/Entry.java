package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_entry;

    @NotNull(message = "Entry date is required")
    private LocalDate entry_date;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Unit cost is required")
    @Positive(message = "Unit cost must be positive")
    private Double unit_cost;

    //Relaciones con otras entidades

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // Asegura que cada entrada tenga un producto asignado
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Asegura que cada entrada tenga un usuario asignado
    private User user;
}