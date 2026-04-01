package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Entry;
import com.gamerstore.gamerstore.repository.EntryRepository;
import com.gamerstore.gamerstore.dto.EntryRequestDTO;
import com.gamerstore.gamerstore.dto.EntryResponseDTO;
import com.gamerstore.gamerstore.entity.Product;
import com.gamerstore.gamerstore.repository.ProductRepository;
import com.gamerstore.gamerstore.entity.User;
import com.gamerstore.gamerstore.repository.UserRepository;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EntryService {
private final EntryRepository entryRepository;
private final ProductRepository productRepository;
private final UserRepository userRepository;

public EntryService(EntryRepository entryRepository, ProductRepository productRepository, UserRepository userRepository) {
    this.entryRepository = entryRepository;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
}

//Entity → DTO
private EntryResponseDTO toDTO(Entry entry) {
    EntryResponseDTO dto = new EntryResponseDTO();
    dto.setId(entry.getId());
    dto.setQuantity(entry.getQuantity());
    dto.setEntry_date(entry.getEntry_date());
    dto.setUnit_cost(entry.getUnit_cost());

    if (entry.getProduct() != null) {
            dto.setProductName(entry.getProduct().getName());
        }

    if (entry.getUser() != null) {
            dto.setUsername(entry.getUser().getName());
        }   
    return dto;
    }

//DTO → Entity
private Entry toEntity(EntryRequestDTO dto) {
    Entry entry = new Entry();
    entry.setQuantity(dto.getQuantity());
    entry.setEntry_date(dto.getEntry_date());
    entry.setUnit_cost(dto.getUnit_cost());

    //Relacion obligatoria con Product porque no se puede crear una entrada sin un producto asociado
    Product product = productRepository.findById(dto.getId_product())
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    entry.setProduct(product);

    //Relacion obligatoria con User porque no se puede crear una entrada sin un usuario asociado
    User user = userRepository.findById(dto.getId_user())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    entry.setUser(user);

    return entry;
    }

    //Crear
    public EntryResponseDTO createEntry(EntryRequestDTO dto) {
        Entry entry = toEntity(dto);
        Product product = entry.getProduct();
        
        //Actualizar el stock del producto al crear una nueva entrada
        product.setCurrent_stock(product.getCurrent_stock() + entry.getQuantity());
        productRepository.save(product);
        entry.setId(null);
        return toDTO(entryRepository.save(entry));
    }

    //Listar todos los registros
    public List<EntryResponseDTO> listAll() {
        return entryRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Listar por ID
    public EntryResponseDTO findEntryById(Long id) {
        Entry entry = entryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrada no econtrada"));
        return toDTO(entry);
    }

    //Actualizar
    /* 
    // En las entradas no deberia de ser posible actualizar el producto ni el usuario asociado, ya que eso implicaria eliminar la entrada original y 
    // crear una nueva con los nuevos datos, lo cual no es lo ideal. por ende solo se puede escribir y leer los datos.
     
    public EntryResponseDTO updateEntry(Long id, EntryRequestDTO dto) {
        Entry entry = entryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        entry.setQuantity(dto.getQuantity());
        entry.setEntry_date(dto.getEntry_date());
        entry.setUnit_cost(dto.getUnit_cost());

        if (dto.getId_product() != null) {
            Product product = productRepository.findById(dto.getId_product())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            entry.setProduct(product);
        }

        if (dto.getId_user() != null) {
            User user = userRepository.findById(dto.getId_user())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            entry.setUser(user);
        }

        return toDTO(entryRepository.save(entry));
    }

    //Eliminar
    public void deleteEntry(Long id) {
        Entry entry = entryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));
        entryRepository.delete(entry);
    }*/
}
