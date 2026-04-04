package com.gamerstore.gamerstore.service;
//Importaciones  para producto
import com.gamerstore.gamerstore.entity.Product; 
import com.gamerstore.gamerstore.repository.ProductRepository;
import com.gamerstore.gamerstore.dto.ProductRequestDTO;
import com.gamerstore.gamerstore.dto.ProductResponseDTO;

//Importaciones para marca
import com.gamerstore.gamerstore.entity.Brand;
import com.gamerstore.gamerstore.repository.BrandRepository;
//import com.gamerstore.gamerstore.dto.BrandResponseDTO;

//Importaciones para categoría
import com.gamerstore.gamerstore.entity.Category;
import com.gamerstore.gamerstore.repository.CategoryRepository;
//import com.gamerstore.gamerstore.dto.CategoryResponseDTO;

//Importaciones para plataforma
import com.gamerstore.gamerstore.entity.Platform;
import com.gamerstore.gamerstore.repository.PlatformRepository;
//import com.gamerstore.gamerstore.dto.PlatformResponseDTO;

//Importaciones para proveedor
import com.gamerstore.gamerstore.entity.Supplier;
import com.gamerstore.gamerstore.repository.SupplierRepository;
//import com.gamerstore.gamerstore.dto.SupplierResponseDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final PlatformRepository platformRepository;
    private final SupplierRepository supplierRepository;

    public ProductService(ProductRepository productRepository, BrandRepository brandRepository,
                          CategoryRepository categoryRepository, PlatformRepository platformRepository,
                          SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.platformRepository = platformRepository;
        this.supplierRepository = supplierRepository;
    }  

    //Entity → DTO
    private ProductResponseDTO toDTO(Product prod) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(prod.getId());
        dto.setName(prod.getName());
        dto.setImage_url(prod.getImage_url());
        dto.setPrice(prod.getPrice());
        dto.setCurrent_stock(prod.getCurrent_stock() != null ? prod.getCurrent_stock() : 0); //Asegura que current_stock no sea nulo
        dto.setDescription(prod.getDescription());

        if (prod.getBrand() != null) {
            dto.setBrandName(prod.getBrand().getName());
        }

        if (prod.getCategory() != null) {
            dto.setCategoryName(prod.getCategory().getName());
        }

        if (prod.getPlatform() != null) {
            dto.setPlatformName(prod.getPlatform().getName());
        }

        if (prod.getSupplier() != null) {
            dto.setSupplierName(prod.getSupplier().getName());
        }

        return dto;
    }

     private void setRelations(Product prod, ProductRequestDTO dto) {

        if (dto.getBrand_id() != null) {
            Brand brand = brandRepository.findById(dto.getBrand_id())
                    .orElseThrow(() -> new RuntimeException("Marca no encontrada"));
            prod.setBrand(brand);
        }

        if (dto.getCategory_id() != null) {
            Category category = categoryRepository.findById(dto.getCategory_id())
                    .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
            prod.setCategory(category);
        }

        if (dto.getPlatform_id() != null) {
            Platform platform = platformRepository.findById(dto.getPlatform_id())
                    .orElseThrow(() -> new RuntimeException("Plataforma no encontrada"));
            prod.setPlatform(platform);
        }

        if (dto.getSupplier_id() != null) {
            Supplier supplier = supplierRepository.findById(dto.getSupplier_id())
                    .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
            prod.setSupplier(supplier);
        }
    }
    //DTO a Entity con relaciones
    private Product toEntity(ProductRequestDTO dto) {
        Product prod = new Product();
        prod.setName(dto.getName());
        prod.setPrice(dto.getPrice());
        prod.setCurrent_stock(dto.getCurrent_stock());
        prod.setImage_url(dto.getImage_url());
        prod.setDescription(dto.getDescription());
        setRelations(prod, dto);
        return prod;
    }

     //Crear
    public ProductResponseDTO save(ProductRequestDTO dto) {
        Product prod = toEntity(dto);
        prod.setId(null);
        return toDTO(productRepository.save(prod)); 
    }

    //Todos los registros
    public List<ProductResponseDTO> listAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //Buscar por ID
    public ProductResponseDTO findById(Long id) {
        Product prod = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return toDTO(prod);
    }

    //Actualizar
    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product prod = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        prod.setName(dto.getName());
        prod.setPrice(dto.getPrice());
        prod.setCurrent_stock(dto.getCurrent_stock());
        prod.setImage_url(dto.getImage_url());

        setRelations(prod, dto);
        return toDTO(productRepository.save(prod));
    }

    //Eliminar
    public void delete(Long id) {
        Product prod = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        productRepository.delete(prod);
    }
}