package com.example.chattingservice.controller;

import com.example.chattingservice.data.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
pub
 */

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat-service")
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    // 웹소켓으로 들어오는 메시지 발행 처리
    // ^^클라이언트에서 /pub/chat/message라고 보내면 된다.
    // ^^클라이언트에서는 해당 주소를(/sub/chat/room/{roomId}) 구독(subscribe)하고 있다가 메시지가 전달되면 화면에 출력하면 됩니다.
    @MessageMapping("/message")
    public void message(MessageDto message) {
//        if (MessageDto.MessageType.ENTER.equals(message.getType()))
//            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
//        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}