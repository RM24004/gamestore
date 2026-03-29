package com.gamerstore.gamerstore.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_category;//falta validar los datos no esta validado
    
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String name;
    
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String description;
}
