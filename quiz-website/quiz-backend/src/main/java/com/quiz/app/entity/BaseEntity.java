package com.quiz.app.entity;

import com.quiz.app.utils.SecurityUtils;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private Date createdDate;

    @Column(updatable = false, nullable = false)
    private Long createdBy;

    private Date updatedDate;
    private Long updatedBy;

    @PrePersist
    public void onPersist() {
        this.setCreatedBy(SecurityUtils.getCurrentUserDetails().getId());
    }

    @PreUpdate
    public void onUpdate() {
        this.setUpdatedDate(new Date());
        this.setUpdatedBy(SecurityUtils.getCurrentUserDetails().getId());
    }
}