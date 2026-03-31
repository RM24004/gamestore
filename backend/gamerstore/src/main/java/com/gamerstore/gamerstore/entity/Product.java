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
    @Column(name = "id_product")
    private Long id;

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