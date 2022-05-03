package com.example.apigateway.exception;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
public class MyWebExceptionHandler implements ErrorWebExceptionHandler {
    private String errorCodeMaker(ErrorCode errorCode) {


        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("httpStatus", errorCode.getHttpStatus().toString());
        jsonObject.addProperty("message", errorCode.getMessage());
        jsonObject.addProperty("errorcode", errorCode.getErrorcode());
// JsonObject를 Json 문자열로 변환
        String jsonStr = new Gson().toJson(jsonObject);

        return  jsonStr;
    }

    @Override
    public Mono<Void> handle(
            ServerWebExchange exchange, Throwable ex) {

        ErrorCode errorCode = null;
        if (ex.getClass() == NullPointerException.class) {
            errorCode = null;
        } else if (ex.getClass() == ExpiredJwtException.class) {
            errorCode = ErrorCode.EXPIRED_TOKEN;
        } else if (ex.getClass() == MalformedJwtException.class) {
            errorCode = ErrorCode.FORGERY_TOKEN;
        } else if (ex.getClass() == UnsupportedJwtException.class) {
            errorCode = ErrorCode.UNAUTHORIZED_MEMBER;
        } else if (ex.getClass() == SignatureException.class) {
            errorCode = ErrorCode.FORMAT_ERROR_TOKEN;
        } else if (ex.getClass() == IllegalArgumentException.class) {
            errorCode = ErrorCode.INVALID_REQUEST;
        }

        byte[] bytes = errorCodeMaker(errorCode).getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
        exchange.getResponse().setStatusCode(errorCode.getHttpStatus());
        return exchange.getResponse().writeWith(Flux.just(buffer));
    }

}