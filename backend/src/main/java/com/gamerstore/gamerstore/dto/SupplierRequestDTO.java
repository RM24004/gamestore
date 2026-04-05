package com.gamerstore.gamerstore.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierRequestDTO {

    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String contact;

    @Size(max = 20)
    private String phone;

    @Email(message = "El correo electrónico no es válido")
    @Size(max = 100)
    private String email;

    @Size(max = 255)
    private String address;

    @NotNull(message = "El ID del país es requerido")
    private Long id_country;
}
