package com.quiz.app.config.security;

import com.quiz.app.utils.TimeConverterUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${jwt.jwtSecret}")
    private String jwtSecret;

    @Value("${jwt.jwtExpiration}")
    private String jwtExpiration;

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        }
        catch (JwtException | IllegalArgumentException e) {
            log.error(e.getMessage());
        }
        return false;
    }
    public String generateJwtToken(Authentication authentication) {
        Date currentDate = new Date();
        long jwtExpirationMs = TimeConverterUtils.getMilliseconds(jwtExpiration);
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationMs);

        MyUserDetails principal = (MyUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setIssuer("quiz-backend")
                .setSubject(principal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key())
                .compact();
    }
    public String getUsername(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }
}
