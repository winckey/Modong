package com.example.chattingservice.controller;

import com.example.chattingservice.data.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/chat-service")
public class ChatController {

    private final SimpMessagingTemplate template;


    //채팅 컨트롤러 (stomp)
    @MessageMapping(value = "/chat/chatting") //클라이언트에서 수신되는 곳
    public void chatController(MessageDto messageDto) {
        System.out.println(messageDto.toString());
        template.convertAndSend("/sub/chatting/room/" + messageDto.getRoomId(), messageDto); // 클이언트로 전송
    }
}