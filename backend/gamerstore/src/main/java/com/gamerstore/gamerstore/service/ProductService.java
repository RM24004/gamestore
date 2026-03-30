package com.gamerstore.gamerstore.service;

import com.gamerstore.gamerstore.entity.Product;
import com.gamerstore.gamerstore.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
     
    public Product save(Product producto) {
        return productRepository.save(producto);
    }

    public List<Product> listAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product update(Long id, Product update) {
        Product p = findById(id);
        p.setName(update.getName());
        p.setPrice(update.getPrice());
        p.setCurrent_stock(update.getCurrent_stock());
        p.setImage_url(update.getImage_url());
        p.setBrand(update.getBrand());
        p.setCategory(update.getCategory());
        p.setPlatform(update.getPlatform());
        p.setSupplier(update.getSupplier());
            
        return productRepository.save(p);  
    }
    public void delete(Long id) {
        Product p = findById(id);
        productRepository.delete(p);
    }
}