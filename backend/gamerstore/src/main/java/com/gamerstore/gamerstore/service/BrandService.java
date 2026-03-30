package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Brand;
import com.gamerstore.gamerstore.repository.BrandRepository;
import com.gamerstore.gamerstore.dto.BrandRequestDTO;
import com.gamerstore.gamerstore.dto.BrandResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BrandService {
    private final BrandRepository brandRepository;
    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }
    
    //Entity → DTO
    private BrandResponseDTO toDTO(Brand bra) {
        return new BrandResponseDTO(
                bra.getId(),
                bra.getName(),
                bra.getDescription()
        );
    }

    //DTO → Entity
    private Brand toEntity(BrandRequestDTO dto) {
        Brand bra = new Brand();
        bra.setName(dto.getName());
        bra.setDescription(dto.getDescription());
        return bra;
    }

    //Crear
    public BrandResponseDTO save(BrandRequestDTO dto) {
        Brand bra = toEntity(dto);
        bra.setId(null);
        return toDTO(brandRepository.save(bra));
    }

    //Todos los registros
    public List<BrandResponseDTO> listAll() {
        return brandRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Buscar por ID
    public BrandResponseDTO findById(Long id) {
        Brand bra = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        return toDTO(bra);
    }

    //Actualizar
    public BrandResponseDTO update(Long id, BrandRequestDTO dto) {
        Brand bra = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        bra.setName(dto.getName());
        bra.setDescription(dto.getDescription());

        return toDTO(brandRepository.save(bra));
    }

    //Eliminar
    public void delete(Long id) {
        Brand bra = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        brandRepository.delete(bra);
    }
}
