package com.gamerstore.gamerstore.dto;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntryResponseDTO {
    private Long id;
    private LocalDate entry_date;
    private Integer quantity;
    private Double unit_cost;
    private String productName;
    private String username;
}
