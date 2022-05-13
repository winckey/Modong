package com.example.chattingservice.service;

import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.dto.UserDto;

import java.util.List;


public interface RoomService {
    Long createChatRoom(String roomName, String type);
    boolean addRoomMember(Long roomId, List<UserDto> userList);
    List<UserDto> getRoomMember(Long roomId);
    List<RoomDto> findAllRoom(Long userId);
    boolean exitChatRoom(Long roomId, Long userId);
}
