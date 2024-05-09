package com.quiz.app.repository;

import com.quiz.app.entity.auth.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ParticipantRepo extends JpaRepository<Participant, Long>, JpaSpecificationExecutor<Participant> {
    Optional<Participant> findByUsername(String username);
}
