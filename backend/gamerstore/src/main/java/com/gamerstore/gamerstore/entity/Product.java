package com.gamerstore.gamerstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_product;

    @NotBlank(message = "Name is required")
    @Size(max = 150)
    private String name;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer current_stock;

    @Size(max = 255)
    private String image_url;

    //Relaciones con otras entidades
    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false) // Asegura que cada producto tenga una marca asignada
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) // Asegura que cada producto tenga una categoría asignada
    private Category category;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false) // Asegura que cada producto tenga una plataforma asignada
    private Platform platform;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false) // Asegura que cada producto tenga un proveedor asignado
    private Supplier supplier;
}