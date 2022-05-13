package com.example.chattingservice.data.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class RoomDto {
    private Long roomId;
    private String name;
    private String type;

    public static RoomDto create(String name, String type) {
        RoomDto roomDto = new RoomDto();
        roomDto.roomId = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;  // 랜덤값
        roomDto.name = name;
        roomDto.type = type;
        return roomDto;
    }
}