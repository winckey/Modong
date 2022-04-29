package com.example.userservice.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RequestUser {


    @NotEmpty(message = "id입력 필수")
    private String userId;
    @NotEmpty(message = "pw입력 필수")
    private String userPw;

    private int age;

    private String date_create;

    private String date_withdraw;

    @NotEmpty(message = "name입력 필수")
    private String name;

    @NotEmpty(message = "nickname입력 필수")
    private String nickname;

    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;


}
