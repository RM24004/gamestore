package com.gamerstore.gamerstore.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CategoryRequestDTO {
     
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String name;
    
    @NotBlank(message = "La descripción es requerida")
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String description;
}
