package com.modong.orderserivce.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatDto {

    private String roomName;
    private String roomType;


    private List<UserDto> userList;


}
