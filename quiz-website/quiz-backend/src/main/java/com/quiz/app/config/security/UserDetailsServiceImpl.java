package com.quiz.app.config.security;

import com.quiz.app.entity.auth.Participant;
import com.quiz.app.exception.AccountBlockedException;
import com.quiz.app.repository.ParticipantRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private ParticipantRepo participantRepo;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Participant participant = participantRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        if(!participant.getEnabled()) {
            throw new AccountBlockedException("Your account has been locked!");
        }
        return MyUserDetails.build(participant);
    }
}
