package com.gamerstore.gamerstore.repository;
import com.gamerstore.gamerstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
