package com.gamerstore.gamerstore.dto;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExitResponseDTO {
    private Long id;
    private LocalDate exit_date;
    private Integer quantity;
    private String productName;
    private String username;
    private String reasonName;
}
