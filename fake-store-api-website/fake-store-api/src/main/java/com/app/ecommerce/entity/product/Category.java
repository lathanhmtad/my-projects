package com.app.ecommerce.entity.product;

import com.app.ecommerce.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Category extends BaseEntity {
    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String alias;

    private String image;
    private Boolean enabled;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private List<Category> children;
}
