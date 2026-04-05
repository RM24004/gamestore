package com.gamerstore.gamerstore.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {

    private Long id;
    private String name;
    private Double price;
    private Integer current_stock;
    private String image_url;
    private String description;
    
    private String brandName; //Nombres en lugar de los IDs para una mejor comprensión en la respuesta
    private String categoryName; 
    private String platformName; 
    private String supplierName; 
}
