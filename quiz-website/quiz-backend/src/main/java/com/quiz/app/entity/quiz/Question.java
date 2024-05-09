package com.quiz.app.entity.quiz;

import com.quiz.app.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Question extends BaseEntity {
    @Column(nullable = false)
    private String description;

    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @ManyToOne
    @JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
    private Quiz quiz;

    @OneToMany(mappedBy = "question")
    private List<Answer> options;
}
