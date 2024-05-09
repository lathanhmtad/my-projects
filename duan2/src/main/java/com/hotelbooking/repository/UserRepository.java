package com.hotelbooking.repository;

import com.hotelbooking.entity.User;
import com.hotelbooking.enums.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u FROM users u WHERE u.isDelete = false")
    Page<User> findAllUser(Pageable pageable);

    Optional<User> findByUsername(String username);
    List<User> findAllByRole(Role role);

}
