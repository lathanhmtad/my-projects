package com.hotelbooking.repository;

import com.hotelbooking.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    @Query(value = "SELECT * FROM voucher\n" +
            "WHERE start_at <= GETDATE() AND end_at >= GETDATE() AND quantity > 0;", nativeQuery = true)
    List<Voucher> getCouponsValidUntil();

    @Transactional
    @Modifying
    @Query(value = "UPDATE voucher\n" +
            "SET quantity = quantity - 1\n" +
            "WHERE id = ?1 ;", nativeQuery = true)
    void updateQuantityVoucher(Long id);
}

