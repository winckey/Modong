package com.example.userservice.vo;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;


@Getter
@Setter
public class RequestLogin {

    @NotNull(message = "id입력 필수")
    private String userId;

    @NotNull(message = "pw 입력 필수")
    private String userPw;
}
