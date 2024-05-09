package com.quiz.app.controller.client;

import com.quiz.app.dto.participant.ParticipantResponse;
import com.quiz.app.mapper.ParticipantMapper;
import com.quiz.app.repository.ParticipantRepo;
import com.quiz.app.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client-api/participants")
@AllArgsConstructor
public class ClientParticipantController {
    private ParticipantRepo participantRepo;
    private ParticipantMapper participantMapper;

    @GetMapping("/info")
    public ResponseEntity<ParticipantResponse> getCurrentParticipant() {

        Long id = SecurityUtils.getCurrentUserDetails().getId();
        ParticipantResponse participantResponse = participantMapper.entityToResponse(
                participantRepo.findById(id).get()
        );

        return ResponseEntity.ok(participantResponse);
    }
}
