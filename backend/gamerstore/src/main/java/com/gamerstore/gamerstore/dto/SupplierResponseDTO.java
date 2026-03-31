package com.gamerstore.gamerstore.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierResponseDTO {
    private Long id;
    private String name;
    private String contact;
    private String phone;
    private String email;
    private String address;
    private String countryName; // Assuming you want to include the country name in the response
}
