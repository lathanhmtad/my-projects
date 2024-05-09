package com.quiz.app.dto.participant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParticipantRequest {
    private String email;
    private String username;
    private String fullName;
    private String password;
    private String role;
    private String avatar;
    private Boolean enabled;
}
