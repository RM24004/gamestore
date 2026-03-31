package com.gamerstore.gamerstore.repository;
import com.gamerstore.gamerstore.entity.Exit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExitRepository extends JpaRepository<Exit, Long> {

}
