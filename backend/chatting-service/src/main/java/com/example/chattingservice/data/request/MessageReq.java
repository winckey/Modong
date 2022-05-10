package com.example.chattingservice.data.request;

import lombok.Data;

@Data
public class MessageReq {
// ^^제약조건
    private String roomId;
    private Long userId;
    private String message;
}
