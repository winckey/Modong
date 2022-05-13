package com.example.chattingservice.data.request;

import lombok.Data;

@Data
public class MessageReq {
// ^^제약조건
    private Long roomId;
    private Long userId;
    private String message;

}
