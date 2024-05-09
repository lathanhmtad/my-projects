package com.app.ecommerce.repository;

import com.app.ecommerce.entity.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IAbstractBaseRepo<T extends BaseEntity> extends JpaRepository<T, Long> {
}
