package com.quiz.app.entity.auth;

import com.quiz.app.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class RefreshToken extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", nullable = false)
    private Participant participant;

    @Column(unique = true, nullable = false)
    private String token;

    @Column(nullable = false)
    private Date expiryDate;
}
