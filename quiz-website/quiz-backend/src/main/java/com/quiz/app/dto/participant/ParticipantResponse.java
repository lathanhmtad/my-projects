package com.quiz.app.dto.participant;

import com.quiz.app.dto.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParticipantResponse extends BaseResponse {
    private String username;
    private String fullName;
    private String email;
    private String avatar;
    private String role;
    private Boolean enabled;
}
