package com.example.chattingservice.data.dto;

import lombok.Data;

@Data
public class RoomUserDto {
    private Long roomId;
    // String타입의 userId입니다. 프론트에 전달해줘야하는 값이기 때문에 Long타입은 사용하지 않습니다.
    private Long userId;
    private String userName;

    public RoomUserDto(Long roomId, UserDto user) {
        this.roomId = roomId;
        this.userId = user.getUserId();
        this.userName = user.getUserName();
    }
}