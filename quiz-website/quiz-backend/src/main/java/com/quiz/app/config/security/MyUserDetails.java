package com.quiz.app.config.security;

import com.quiz.app.entity.auth.Participant;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class MyUserDetails extends User {
    private Long id;
    public MyUserDetails(
            Long id,
            String username,
            String password,
            boolean enabled,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.id = id;
    }

    public static UserDetails build(Participant participant) {
        String role = participant.getRole().toString();
        List<GrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority(role)
        );
        return new MyUserDetails(
                participant.getId(),
                participant.getUsername(),
                participant.getPassword(),
                participant.getEnabled(),
                true,
                true,
                true,
                authorities
                );
    }
}
