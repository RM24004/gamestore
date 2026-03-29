package com.gamerstore.gamerstore.repository;

import com.gamerstore.gamerstore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  CategoryRepository  extends JpaRepository<Category, Long> {

}
