package com.gamerstore.gamerstore.repository;
import com.gamerstore.gamerstore.entity.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EntryRepository extends JpaRepository<Entry, Long> {

}
