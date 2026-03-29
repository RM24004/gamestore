package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "exit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_exit;

    @NotNull(message = "Exit date is required")
    private LocalDate exit_date;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    //Relaciones con otras entidades

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) // Asegura que cada salida tenga un producto asignado
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Asegura que cada salida tenga un usuario asignado
    private User user;

    @ManyToOne
    @JoinColumn(name = "reason_id", nullable = false) // Asegura que cada salida tenga una razón asignada
    private Reason reason;
}