package com.example.userservice.vo;

import com.example.userservice.db.entity.Dongcode;
import com.example.userservice.dto.DongDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)// null값인것은 버리고 전송하지 않는다.
public class ResponseUser {


    private Long id;

    private String userId;

    private String date_create;

    private String nickname;

    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;

    private com.example.userservice.dto.DongDto dongDto;

}
