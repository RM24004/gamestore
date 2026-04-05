package com.gamerstore.gamerstore.dto;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CategoryResponseDTO {
    private Long id;
    private String name;
    private String description;
}
