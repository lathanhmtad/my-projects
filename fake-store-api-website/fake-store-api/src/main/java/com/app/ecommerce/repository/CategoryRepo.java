package com.app.ecommerce.repository;

import com.app.ecommerce.entity.product.Category;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepo extends IAbstractBaseRepo<Category> {
    Optional<Category> findByName(String name);
}
