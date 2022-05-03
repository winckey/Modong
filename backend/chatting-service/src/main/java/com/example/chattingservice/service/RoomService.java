package com.example.chattingservice.service;

import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.dto.UserDto;

import java.util.List;


public interface RoomService {
    Long createChatRoom(String roomName, String type);
    boolean addRoomMember(Long roomId, List<UserDto> userList);
    List<RoomDto> findAllRoom(String userId);
    boolean exitChatRoom(Long roomId, String userId);
}
