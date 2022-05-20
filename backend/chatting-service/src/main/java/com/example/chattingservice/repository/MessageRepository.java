package com.example.chattingservice.repository;

import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<MessageEntity,Long> {

//    getMessageList(String roomId)
    Optional<List<MessageEntity>> findByRoomId(Long roomId);
//    addMessage(roomId, userId,message, date)

}