package com.gamerstore.gamerstore.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EntryRequestDTO {

    @NotNull(message = "Fecha de entrada es requerida")
    private LocalDate entry_date;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer quantity;

    @NotNull(message = "El costo unitario es requerido")
    @Positive(message = "El costo unitario debe ser positivo")
    private Double unit_cost;

    @NotNull(message = "El ID del producto es requerido")
    private Long id_product;

    @NotNull(message = "El ID del usuario es requerido")
    private Long id_user;
}
