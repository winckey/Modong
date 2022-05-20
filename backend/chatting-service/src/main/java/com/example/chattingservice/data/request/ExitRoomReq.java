package com.example.chattingservice.data.request;

import com.example.chattingservice.data.dto.UserDto;
import lombok.Data;

import java.util.List;

@Data
public class ExitRoomReq {
// ^^제약조건
    private Long roomId;
    private Long userId;
}
