package com.app.ecommerce.entity.product;

import com.app.ecommerce.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Brand extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false)
    private String logo;

    @ManyToMany
    @JoinTable(
            name = "brand_category",
            joinColumns = @JoinColumn(
                    name = "brand_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "category_id", referencedColumnName = "id")
    )
    private List<Category> categories;
}
