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
    @Column(name = "id_entry")
    private Long id;

    @NotNull(message = "Fecha de entrada es requerida")
    private LocalDate entry_date;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer quantity;

    @NotNull(message = "El costo unitario es requerido")
    @Positive(message = "El costo unitario debe ser positivo")
    private Double unit_cost;

    @ManyToOne(fetch = FetchType.LAZY) // Relación con Product para obtener el producto asociado a esta entrada
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY) // Relación con User para obtener el usuario que registró esta entrada
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Override // Implementación de equals y hashCode basada en el ID para garantizar la correcta comparación de entidades
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Entry)) return false;
        return id != null && id.equals(((Entry) o).getId());
    }

    @Override // El hashCode se basa en el ID para garantizar la consistencia con equals
    public int hashCode() {
        return getClass().hashCode();
    }
}