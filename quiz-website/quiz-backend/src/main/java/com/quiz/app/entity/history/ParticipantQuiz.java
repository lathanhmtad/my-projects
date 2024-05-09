package com.quiz.app.entity.history;

import com.quiz.app.entity.BaseEntity;
import com.quiz.app.entity.auth.Participant;
import com.quiz.app.entity.quiz.Quiz;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class ParticipantQuiz extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", nullable = false)
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "quiz_id", referencedColumnName = "id", nullable = false)
    private Quiz quiz;

    @Column(nullable = false)
    private Boolean isFinished;

    @Column(nullable = false)
    private Date timeStart;

    private Date timeEnd;
}
