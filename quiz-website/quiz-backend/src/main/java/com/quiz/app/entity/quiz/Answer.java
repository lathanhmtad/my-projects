package com.quiz.app.entity.quiz;

import com.quiz.app.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer extends BaseEntity {
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean correctAnswer;

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
    private Question question;
}
