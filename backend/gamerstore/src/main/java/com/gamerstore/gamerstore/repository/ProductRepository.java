package com.gamerstore.gamerstore.repository;

import com.gamerstore.gamerstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
