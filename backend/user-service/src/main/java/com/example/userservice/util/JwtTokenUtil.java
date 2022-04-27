package com.example.userservice.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;




@Slf4j
@Component
public class JwtTokenUtil {


    Environment env;

//    private String SECRET_KEY = env.getProperty("token.secret");
//    private Long ACCESS_TOKEN_EXPIRATION_TIME = Long.parseLong(env.getProperty("token.expiration_time"));
//    private Long REFRESH_TOKEN_EXPIRATION_TIME = Long.parseLong(env.getProperty("token.re_expiration_time"));
// 이거 적용하는법 알아오기
    public JwtTokenUtil(Environment env) {
        this.env = env;
    }


    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }



    public String generateAccessToken(String username) {
        return doGenerateToken(username, Long.parseLong(env.getProperty("token.expiration_time")));
    }

    public String generateRefreshToken(String username) {
        return doGenerateToken(username, Long.parseLong(env.getProperty("token.re_expiration_time")));
    }

    private String doGenerateToken(String username, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("username", username);

        String token =
        Jwts.builder()//JwtBuilder객체를 생성하고 Jwts.builder() 메서드를 이용한다.
                .setClaims(claims)//header 파라메터와 claims를 추가하기위해 JwtBuilder 메서드를 호출한다.
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(env.getProperty("token.secret")), SignatureAlgorithm.HS256)//JWT를 서명하기위해 SecretKey나 PrivateKey를 지정한다.
                .compact();//마지막으로 압축하고 서명하기위해 compact()를 호출하고, jws를 생성한다.
        return token;
    }
}
