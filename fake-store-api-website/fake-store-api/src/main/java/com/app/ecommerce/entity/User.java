package com.app.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User extends BaseEntity {
    @Column(unique = true)
    private String email;

    private String password;
    private String fullName;
    private String avatar;
    private Boolean enabled;

    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;

    @Builder
    public User(String email, String password, String fullName, String avatar, Boolean enabled, List<Role> roles) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.avatar = avatar;
        this.enabled = enabled;
        this.roles = roles;
    }
}
