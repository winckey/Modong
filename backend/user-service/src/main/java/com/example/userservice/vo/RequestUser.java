package com.example.userservice.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUser {

    private Long id;

    private String userId;

    private String userPw;

    private int age;

    private String date_create;

    private String date_withdraw;

    private String name;

    private String nickname;

    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;


}
