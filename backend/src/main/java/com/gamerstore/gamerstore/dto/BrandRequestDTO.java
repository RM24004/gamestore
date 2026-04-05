package com.gamerstore.gamerstore.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandRequestDTO {
  
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String name;

    @NotBlank(message = "La descripcion es requerido")
    @Size(max = 100, message = "La descripcion no puede superar los 100 caracteres")
    private String description;
}
