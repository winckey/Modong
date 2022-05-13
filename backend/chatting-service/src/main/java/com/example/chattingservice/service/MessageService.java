package com.example.chattingservice.service;

import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;

import java.util.List;


public interface MessageService {
    List<MessageDto> getMessageList(Long roomId);
    boolean addMessage(MessageDto msgDto);
}
