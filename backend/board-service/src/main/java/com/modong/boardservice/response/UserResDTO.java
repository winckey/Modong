package com.modong.boardservice.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResDTO {

    Long id;
    String name;
    String userId;
    String img;


}
