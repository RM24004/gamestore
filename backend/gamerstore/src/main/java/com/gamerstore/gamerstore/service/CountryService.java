package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Country;
import com.gamerstore.gamerstore.repository.CountryRepository;
import com.gamerstore.gamerstore.dto.CountryRequestDTO;
import com.gamerstore.gamerstore.dto.CountryResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    //Entity → DTO
    private CountryResponseDTO toDTO(Country con) {
        return new CountryResponseDTO(
                con.getId(),
                con.getName(),
                con.getDescription()
        );
    }

    //DTO → Entity
    private Country toEntity(CountryRequestDTO dto) {
        Country con = new Country();
        con.setName(dto.getName());
        con.setDescription(dto.getDescription());
        return con;
    }

    //Crear
    public CountryResponseDTO save(CountryRequestDTO dto) {
        Country con = toEntity(dto);
        con.setId(null);
        return toDTO(countryRepository.save(con));
    }

    //Todos los registros
    public List<CountryResponseDTO> listAll() {
        return countryRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Buscar por ID
    public CountryResponseDTO findById(Long id) {
        Country con = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));
        return toDTO(con);
    }

    //Actualizar
    public CountryResponseDTO update(Long id, CountryRequestDTO dto) {
        Country con = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));

        con.setName(dto.getName());
        con.setDescription(dto.getDescription());

        return toDTO(countryRepository.save(con));
    }

    //Eliminar
    public void delete(Long id) {
        Country con = countryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Country not found"));
        countryRepository.delete(con);
    }
    
}
