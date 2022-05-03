package com.example.apigateway.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

import static org.springframework.http.HttpStatus.*;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
@AllArgsConstructor
@ToString
public enum ErrorCode implements Serializable {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_REQUEST(BAD_REQUEST, "잘못된 요청 입니다.",1000),
    FORGERY_TOKEN(BAD_REQUEST, "토큰이 위조되었습니다" , 1001),
    EXPIRED_TOKEN(BAD_REQUEST, "토큰기간이 만료 되었습니다" , 1002),
    FORMAT_ERROR_TOKEN(BAD_REQUEST, "토큰 유형이 잘못 되었습니다" , 1003),
    INVALID_REFRESH_TOKEN(BAD_REQUEST, "리프레시 토큰이 유효하지 않습니다" , 1004),
    MISMATCH_REFRESH_TOKEN(BAD_REQUEST, "리프레시 토큰의 유저 정보가 일치하지 않습니다"  , 1005),

    /* 401 BAD_REQUEST : 잘못된 요청 */
    UNAUTHORIZED_MEMBER(UNAUTHORIZED, "현재 내 계정 정보가 존재하지 않습니다" , 1006);

    @SerializedName("httpStatus")
    private HttpStatus httpStatus;
    @SerializedName("message")
    private String message;
    @SerializedName("errorcode")
    private int errorcode;




}
