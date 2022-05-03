package com.example.apigateway.config;

import com.example.apigateway.exception.MyWebExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.net.HttpHeaders;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {


    JwtTokenUtil jwtTokenUtil;
    MyWebExceptionHandler myWebExceptionHandler;

    public AuthorizationHeaderFilter(Environment env, JwtTokenUtil jwtTokenUtil,  MyWebExceptionHandler myWebExceptionHandler) {
        super(Config.class);
        this.jwtTokenUtil = jwtTokenUtil;
        this.myWebExceptionHandler = myWebExceptionHandler;
    }

    public static class Config {
        // Put configuration properties here
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer", "");
            // AUTHORIZATION 이름이 값을 헤더에서 때오고 Bearer 떄고 파싱
            try {
                if (!jwtTokenUtil.validateToken(jwt)) {// 토큰 틀리게 해서 디버깅해보기
                    return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED);
                }
            } catch (Exception e) {
                return myWebExceptionHandler.handle(exchange ,e);
            }
            return chain.filter(exchange);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(err);
        exchange.getResponse().setStatusCode(httpStatus);

        return response.setComplete();


    }


}