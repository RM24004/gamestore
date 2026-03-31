package com.gamerstore.gamerstore.repository;

import com.gamerstore.gamerstore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
