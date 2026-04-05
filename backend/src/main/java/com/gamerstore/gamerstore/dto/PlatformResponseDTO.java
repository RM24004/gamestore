package com.gamerstore.gamerstore.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlatformResponseDTO {
    private Long id;
    private String name;
    private String description;
}
