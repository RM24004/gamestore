package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Platform;
import com.gamerstore.gamerstore.repository.PlatformRepository;
import com.gamerstore.gamerstore.dto.PlatformRequestDTO;
import com.gamerstore.gamerstore.dto.PlatformResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlatformService {
    private final PlatformRepository platformRepository;
    public PlatformService(PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }
    //Entity → DTO
    private PlatformResponseDTO toDTO(Platform platform) {
        return new PlatformResponseDTO(
                platform.getId(),
                platform.getName(),
                platform.getDescription()
        );
    }

    //DTO → Entity
    private Platform toEntity(PlatformRequestDTO dto) {
        Platform platform = new Platform();
        platform.setName(dto.getName());
        platform.setDescription(dto.getDescription());
        return platform;
    }
    
    //Crear
    public PlatformResponseDTO save(PlatformRequestDTO dto) {
        Platform platform = toEntity(dto);
        platform.setId(null);
        return toDTO(platformRepository.save(platform));
    }

    //Todos los registros
    public List<PlatformResponseDTO> listAll() {
        return platformRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }
    
    //Buscar por ID
    public PlatformResponseDTO findById(Long id) {
        Platform platform = platformRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plataform no Encontrada"));
        return toDTO(platform);
    }
    
    //Actualizar
    public PlatformResponseDTO update(Long id, PlatformRequestDTO dto) {
        Platform platform = platformRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plataform no Encontrada"));

        platform.setName(dto.getName());
        platform.setDescription(dto.getDescription());

        return toDTO(platformRepository.save(platform));
    }

    //Eliminar
    public void delete(Long id) {
        Platform platform = platformRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plataform no Encontrada"));
        platformRepository.delete(platform);
    }
}
