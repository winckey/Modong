package com.example.chattingservice.repository;

import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.entity.MessageEntity;
import com.example.chattingservice.data.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface RoomRepository extends JpaRepository<RoomEntity,Long> {

//    exitChatRoom(String roomName, String userId)
    Optional<RoomEntity> findById(Long roomId);
}