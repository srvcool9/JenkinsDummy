package com.netlink.rsk.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Component
public class JSONWebTokenGenerator implements Serializable {

    private String key = "Hellowrold345";

    public String getUserFromToken(final String _token) throws Exception{
        String user = getClaimFromToken(_token, Claims::getSubject);
        return user;

    }

    public Date getIssuedTime(final String _token) {
        return getClaimFromToken(_token, Claims::getIssuedAt);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);


    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails details) {
        Map<String, Object> claim = new HashMap<>();
        String token = buildToken(claim, details.getUsername());
        return token;

    }

    private String buildToken(Map<String, Object> claim, String subject) {
        String _token = Jwts.builder().setClaims(claim).
                setSubject(subject).
                setIssuedAt(new Date(System.currentTimeMillis())).
                signWith(SignatureAlgorithm.HS512, key).compact();
        return _token;
    }

    public Boolean validateToken(String token, UserDetails userDetails) throws Exception {
        if(!token.isEmpty()) {
            final String username = getUserFromToken(token);
            return (username.equals(userDetails.getUsername()));
        }
        return false;
    }
}
