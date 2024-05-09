package com.app.ecommerce.data.role;

import com.app.ecommerce.entity.Role;
import com.app.ecommerce.repository.RoleRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class RoleRepositoryTests {
    @Autowired
    private RoleRepo roleRepo;

    @Test
    public void testCreateFirstRole() {
        Role roleAdmin = new Role();
        roleAdmin.setName("Admin");
        roleAdmin.setDescription("manage everything");
        this.setDefaultAuditing(roleAdmin);

        Role savedRole = roleRepo.save(roleAdmin);
        Assertions.assertThat(savedRole.getId()).isGreaterThan(0);
    }

    @Test
    public void testCreateRestRoles() {
        Role roleSalesperson = new Role();
        roleSalesperson.setName("Salesperson");
        roleSalesperson.setDescription("manage product price, customers, shipping, orders and sales report");
        this.setDefaultAuditing(roleSalesperson);

        Role roleEditor = new Role();
        roleEditor.setName("Editor");
        roleEditor.setDescription("manage categories, brands, products, articles and menus");
        this.setDefaultAuditing(roleEditor);

        Role roleShipper = new Role();
        roleShipper.setName("Shipper");
        roleShipper.setDescription("view products, view orders and update order status");
        this.setDefaultAuditing(roleShipper);

        Role roleAssistant = new Role();
        roleAssistant.setName("Assistant");
        roleAssistant.setDescription("manage questions and reviews");
        this.setDefaultAuditing(roleAssistant);

        roleRepo.saveAll(List.of(roleSalesperson, roleEditor, roleShipper, roleAssistant));
    }

    private void setDefaultAuditing(Role role) {
        role.setCreatedBy(1L);
        role.setModifiedBy(1L);
    }
}
