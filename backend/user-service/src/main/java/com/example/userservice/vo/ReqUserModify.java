package com.example.userservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqUserModify {

    private Long id;


    @Schema(example = "test_id")
    private String userId;

    @Schema(example = "test_nickname")
    private String nickname;

    @Schema(example = "010-1111-1111")
    private String phone;

    private Long dongcode;


}
