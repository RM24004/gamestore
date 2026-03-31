package com.gamerstore.gamerstore.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExitRequestDTO {
    @NotNull(message = "Fecha de salida es requerida")
    private LocalDate exit_date;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer quantity;

    @NotNull(message = "El ID del producto es requerido")
    private Long id_product;

    @NotNull(message = "El ID del usuario es requerido")
    private Long id_user;

    @NotNull(message = "El ID de la razón es requerido")
    private Long id_reason;
}
