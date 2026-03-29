package com.gamerstore.gamerstore.repository;

import com.gamerstore.gamerstore.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CountryRepository extends JpaRepository<Country, Long> {

}
