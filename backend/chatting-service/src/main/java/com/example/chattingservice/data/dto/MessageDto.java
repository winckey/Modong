package com.example.chattingservice.data.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {

    private Long roomId; // 방번호
    private Long userId; // 메시지 보낸사람
    private String userName; // 메시지 보낸사람
    private String message; // 메시지
    private LocalDateTime date;
}