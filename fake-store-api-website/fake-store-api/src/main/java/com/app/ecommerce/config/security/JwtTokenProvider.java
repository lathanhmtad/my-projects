package com.app.ecommerce.config.security;

import org.springframework.stereotype.Component;

import com.app.ecommerce.utils.TimeConverterUtil;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${com.app.ecommerce.jwt.jwtSecret}")
    private String jwtSecret;

    @Value("${com.app.ecommerce.jwt.jwtExpiration}")
    private String jwtExpiration;

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        }
        catch (IllegalArgumentException e) {
            throw new JwtException(e.getMessage());
        }
        catch (JwtException e) {
            throw new JwtException(e.getMessage());
        }
    }
    public String generateTokenFromUsername(String username) {
        Date currentDate = new Date();
        long jwtExpirationMs = TimeConverterUtil.getMilliseconds(jwtExpiration);
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setIssuer("fake-store-api")
                .setSubject(username)
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
