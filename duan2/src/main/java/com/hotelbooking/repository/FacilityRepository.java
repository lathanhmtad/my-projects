package com.hotelbooking.repository;

import com.hotelbooking.entity.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<Facility,Long> {

    @Query("select f from Facility f where f.isDelete = :isDelete")
    public Page<Facility> findAllByDelete(Boolean isDelete, Pageable pageable);
}
