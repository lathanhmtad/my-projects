package com.app.ecommerce.repository;

import com.app.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepo extends JpaRepository<Role, Long> {
    @Query("select r from Role r where r.name in (:names)")
    List<Role> findAllByName(@Param("names") List<String> names);

    Role findByName(String name);
}
