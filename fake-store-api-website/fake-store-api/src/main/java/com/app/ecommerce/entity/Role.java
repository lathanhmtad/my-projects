package com.app.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Role extends BaseEntity {
    @Column(unique = true)
    private String name;

    private String description;
}
