package com.gamerstore.gamerstore.dto;

import org.hibernate.validator.constraints.URL;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {

        @NotBlank(message = "Nombre es requerido")
        @Size(max = 150)
        private String name;
       
        @NotNull(message = "Precio es requerido")
        @Positive(message = "Precio debe ser positivo")
        private Double price;
       
        @NotNull(message = "Stock es requerido")
        @Min(value = 0, message = "Stock no puede ser negativo")
        private Integer current_stock;
        
        @Size(max = 255)
        @URL(message = "La URL de la imagen no es válida")
        private String image_url;

        @Size(max = 255)
        //@URL(message = "Debe de agregar una descripcion")
        private String description;
        
        //@NotNull(message = "El ID del marca es obligatorio")
        private Long brand_id;

        //@NotNull(message = "El ID de la categoría es obligatorio")
        private Long category_id;

        //@NotNull(message = "El ID de la plataforma es obligatorio")
        private Long platform_id;

        //@NotNull(message = "El ID del proveedor es obligatorio")
        private Long supplier_id;

}
