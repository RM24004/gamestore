package com.gamerstore.gamerstore.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RoleResponseDTO {
    private Long id;
    private String name;
    private String description;
}
