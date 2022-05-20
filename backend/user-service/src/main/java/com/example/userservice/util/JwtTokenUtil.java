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

    public Claims extractAllClaims(String token) {
        //Payload 부분에는 토큰에 담을 정보가 들어있습니다.
        // 여기에 담는 정보의 한 ‘조각’ 을 클레임(claim) 이라고 부르고,
        // 이는 name / value 의 한 쌍으로 이뤄져있습니다.
        // 토큰에는 여러개의 클레임 들을 넣을 수 있습니다.
        //payload 안에서 private 값을 Claims 객체에 담아 관리가능!
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); 이거 안함
        return Jwts.parserBuilder()//Jwts.parseBuilder메서드를 이용해서 JwtParseBuilder인스턴스를 생성한다.
                .setSigningKey(getSigningKey(env.getProperty("token.secret")))//JWS 서명 검증을 위한 SecretKey 혹은 비대칭 PublicKey를 지정한다.
                .build()//스레드에 안전한 JwtPaser를 리턴하기 위해 JwtPaserBuilder의 build()메서드를 호출한다.
                .parseClaimsJws(token)//마지막으로 원본 JWS를 생성하는 jws를 가지고 parseClaimsJws(String)메서드를 호출한다.
                .getBody();//파싱이나 서명검증오류 경우에 try/catch구문으로 전체를 감싼다. 예외와 실패 원인은 나중에 다룬다.
//            https://samtao.tistory.com/65

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

    public long getRemainMilliSeconds(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
    }
}
