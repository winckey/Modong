package com.example.userservice.dto;

import com.example.userservice.db.entity.Dongcode;
import lombok.Data;



@Data
public class UserDto {


    private Long id;

    private String userId;

    private int age;

    private String date_create;


    private String nickname;

    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;

    private DongDto dongDto;


    public void setDongDto(Dongcode dongcode) {
        this.dongDto = DongDto.of(dongcode);
    }
}
