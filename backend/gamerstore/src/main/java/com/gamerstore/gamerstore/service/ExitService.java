package com.gamerstore.gamerstore.service;
import com.gamerstore.gamerstore.entity.Exit;
import com.gamerstore.gamerstore.repository.ExitRepository;
import com.gamerstore.gamerstore.dto.ExitRequestDTO;
import com.gamerstore.gamerstore.dto.ExitResponseDTO;
import com.gamerstore.gamerstore.entity.Product;
import com.gamerstore.gamerstore.repository.ProductRepository;
import com.gamerstore.gamerstore.entity.User;
import com.gamerstore.gamerstore.repository.UserRepository;
import com.gamerstore.gamerstore.entity.Reason;
import com.gamerstore.gamerstore.repository.ReasonRepository;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ExitService {
    private final ExitRepository exitRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ReasonRepository reasonRepository;

    public ExitService(ExitRepository exitRepository, ProductRepository productRepository, UserRepository userRepository, ReasonRepository reasonRepository) {
        this.exitRepository = exitRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reasonRepository = reasonRepository;
    }

    //Entity → DTO
    private ExitResponseDTO toDTO(Exit exit) {
        ExitResponseDTO dto = new ExitResponseDTO();
        dto.setId(exit.getId());
        dto.setQuantity(exit.getQuantity());
        dto.setExit_date(exit.getExit_date());
       
        if (exit.getReason() != null) {
                dto.setReasonName(exit.getReason().getName());
            }
        if (exit.getProduct() != null) {
                dto.setProductName(exit.getProduct().getName());
            }

        if (exit.getUser() != null) {
                dto.setUsername(exit.getUser().getName());
            }   
        return dto;
    }

    //DTO → Entity
    private Exit toEntity(ExitRequestDTO dto) {
        Exit exit = new Exit();
        exit.setQuantity(dto.getQuantity());
        exit.setExit_date(dto.getExit_date());
        
        //Relacion obligatoria con Product porque no se puede crear una salida sin un producto asociado
        Product product = productRepository.findById(dto.getId_product())
            .orElseThrow(() -> new RuntimeException("Product not found"));
        exit.setProduct(product);

        //Relacion obligatoria con User porque no se puede crear una salida sin un usuario asociado
        User user = userRepository.findById(dto.getId_user())
            .orElseThrow(() -> new RuntimeException("User not found"));
        exit.setUser(user);

        //Relacion obligatoria con Reason porque no se puede crear una salida sin una razón asociada
        Reason reason = reasonRepository.findById(dto.getId_reason())
            .orElseThrow(() -> new RuntimeException("Reason not found"));
        exit.setReason(reason);
       
        return exit;
    }

    //crear
    public ExitResponseDTO createExit(ExitRequestDTO dto) {
        Exit exit = toEntity(dto);
        Product product = exit.getProduct();
        
        if (product.getCurrent_stock() < exit.getQuantity()) {
            throw new RuntimeException("No hay suficiente stock para realizar esta salida");
        }
        //Actualizar el stock del producto al crear una nueva salida
        product.setCurrent_stock(product.getCurrent_stock() - exit.getQuantity());
        productRepository.save(product);
        
        exit.setId(null);
        return toDTO(exitRepository.save(exit));
    }

    //Listar todas las salidas
    public List<ExitResponseDTO> getAllExits() {
        return exitRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    //Listar una salida por id
    public ExitResponseDTO getExitById(Long id) {
        Exit exit = exitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exit not found"));
        return toDTO(exit);
    }

    //Actualizar
    /*
    public ExitResponseDTO updateExit(Long id, ExitRequestDTO dto) {
        Exit exit = exitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exit not found"));
        exit.setQuantity(dto.getQuantity());
        exit.setExit_date(dto.getExit_date());
        exit.setUnit_cost(dto.getUnit_cost());

        //Actualizar el producto asociado a la salida
        Product product = productRepository.findById(dto.getId_product())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        exit.setProduct(product);

        //Actualizar el usuario asociado a la salida
        User user = userRepository.findById(dto.getId_user())
                .orElseThrow(() -> new RuntimeException("User not found"));
        exit.setUser(user);

        return toDTO(exitRepository.save(exit));
    }
    */

    //Eliminar
    /*
    public void deleteExit(Long id) {
         Exit exit = exitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exit not found"));
        exitRepository.delete(exit);
    }
    */
}
