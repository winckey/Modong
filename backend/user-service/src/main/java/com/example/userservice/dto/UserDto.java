package com.example.userservice.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
public class UserDto {

    private Long id;

    private String userId;

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
