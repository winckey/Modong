package com.example.userservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RequestUser {


    @NotEmpty(message = "id입력 필수")
    @Schema(example = "test_id")
    private String userId;

    @NotEmpty(message = "pw입력 필수")
    @Schema(example = "test_pw")
    private String userPw;

    @Schema(example = "23")
    private int age;

    private String date_create;

    private String date_withdraw;

    @NotEmpty(message = "name입력 필수")
    @Schema(example = "test_name")
    private String name;

    @NotEmpty(message = "nickname입력 필수")
    @Schema(example = "test_nickname")
    private String nickname;

    @Schema(example = "010-1111-1111")
    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;


}
