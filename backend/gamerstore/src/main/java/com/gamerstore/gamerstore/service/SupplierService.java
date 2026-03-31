package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Supplier;
import com.gamerstore.gamerstore.repository.SupplierRepository;
import com.gamerstore.gamerstore.dto.SupplierRequestDTO;
import com.gamerstore.gamerstore.dto.SupplierResponseDTO;
import com.gamerstore.gamerstore.entity.Country;
import com.gamerstore.gamerstore.repository.CountryRepository;
import com.gamerstore.gamerstore.dto.CountryResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;
    private final CountryRepository countryRepository;

    public SupplierService(SupplierRepository supplierRepository, CountryRepository countryRepository) {
        this.supplierRepository = supplierRepository;
        this.countryRepository = countryRepository;
    }

    //Entity → DTO
    private SupplierResponseDTO toDTO(Supplier sup) {
        SupplierResponseDTO dto = new SupplierResponseDTO();
        dto.setId(sup.getId());
        dto.setName(sup.getName());
        dto.setContact(sup.getContact());
        dto.setPhone(sup.getPhone());
        dto.setEmail(sup.getEmail());
        dto.setAddress(sup.getAddress());

        Country country = sup.getCountry();
        if (country != null) {
            CountryResponseDTO countryDTO = new CountryResponseDTO();
            countryDTO.setId(country.getId());
            countryDTO.setName(country.getName());
            dto.setCountryName(countryDTO.getName());
        }

        return dto;
    }

    //DTO → Entity
    private Supplier toEntity(SupplierRequestDTO dto) {
        Supplier sup = new Supplier();
        sup.setName(dto.getName());
        sup.setContact(dto.getContact());
        sup.setPhone(dto.getPhone());
        sup.setEmail(dto.getEmail());
        sup.setAddress(dto.getAddress());

        if (dto.getId_country() != null) {
            Country country = countryRepository.findById(dto.getId_country())
                    .orElseThrow(() -> new RuntimeException("Country not found"));
            sup.setCountry(country);
        }

        return sup;
    }

     //Crear
    public SupplierResponseDTO save(SupplierRequestDTO dto) {
        Supplier sup = toEntity(dto);
        sup.setId(null);
        return toDTO(supplierRepository.save(sup));
    }

    //Todos los registros
    public List<SupplierResponseDTO> listAll() {
        return supplierRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Buscar por ID
    public SupplierResponseDTO findById(Long id) {
        Supplier sup = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        return toDTO(sup);
    }

    //Actualizar
    public SupplierResponseDTO update(Long id, SupplierRequestDTO dto) {
        Supplier sup = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        sup.setName(dto.getName());
        sup.setContact(dto.getContact());
        sup.setPhone(dto.getPhone());
        sup.setEmail(dto.getEmail());
        sup.setAddress(dto.getAddress());

        return toDTO(supplierRepository.save(sup));
    }

    //Eliminar
    public void delete(Long id) {
        Supplier sup = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierRepository.delete(sup);
    }
}
