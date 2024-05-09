package com.quiz.app.entity.history;

import com.quiz.app.entity.BaseEntity;
import com.quiz.app.entity.auth.Participant;
import com.quiz.app.entity.quiz.Question;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ParticipantQuestionAnswer extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", nullable = false)
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id", nullable = false)
    private Question question;

    private String userAnswer;
}
