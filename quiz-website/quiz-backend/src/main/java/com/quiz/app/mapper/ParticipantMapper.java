package com.quiz.app.mapper;

import com.quiz.app.dto.participant.ParticipantRequest;
import com.quiz.app.dto.participant.ParticipantResponse;
import com.quiz.app.entity.auth.Participant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParticipantMapper extends GenericMapper<Participant, ParticipantRequest, ParticipantResponse>{}
