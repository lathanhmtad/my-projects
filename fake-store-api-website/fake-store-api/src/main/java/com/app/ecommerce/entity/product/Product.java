package com.app.ecommerce.entity.product;

import com.app.ecommerce.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product extends BaseEntity {
    private String name;
    private String alias;
    private String short
}
