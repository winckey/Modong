package com.example.chattingservice.data.request;

import com.example.chattingservice.data.dto.UserDto;
import lombok.Data;
import java.util.List;

@Data
public class CreateRoomReq {
// ^^제약조건
    private String roomName;
    private String roomType;
    private List<UserDto> userList;
}
