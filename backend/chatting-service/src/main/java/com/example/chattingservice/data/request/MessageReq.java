package com.example.chattingservice.data.request;

import com.example.chattingservice.data.dto.UserDto;
import lombok.Data;

import java.util.List;

@Data
public class MessageReq {
// ^^제약조건
    private String roomId;
    private String userId;
    private String message;
}
