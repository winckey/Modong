package com.example.chattingservice.controller;

import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.dto.UserDto;
import com.example.chattingservice.data.request.CreateRoomReq;
import com.example.chattingservice.data.request.MessageReq;
import com.example.chattingservice.data.response.CreateRoomRes;
import com.example.chattingservice.data.response.RoomRes;
import com.example.chattingservice.service.MessageService;
import com.example.chattingservice.service.RoomService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat-service/chat")
public class RoomController {

    @Autowired
    RoomService roomService;
    @Autowired
    MessageService msgService;


    // 채팅방 생성
    @PostMapping
    @ResponseBody
    @ApiOperation(value = "채팅방 생성", notes = "board-service에서 요청해주세요")
    public ResponseEntity<CreateRoomRes> createRoom(@RequestBody CreateRoomReq req) {
        CreateRoomRes res = new CreateRoomRes();
        try{
            Long roomId = roomService.createChatRoom(req.getRoomName(), req.getRoomType());
            roomService.addRoomMember(roomId, req.getUserList());
            res = new CreateRoomRes(roomId);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    // 채팅방 목록
    @GetMapping("/{userId}")
    @Operation(summary = "채팅방 목록", description  = "userId로 채팅방 채팅 내역 조회")
    @ResponseBody
    public ResponseEntity<List<RoomRes>> room(@PathVariable("userId") String userId) {
        List<RoomRes> res = new ArrayList<RoomRes>();

        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try {
            // 유저가 속한 방 아이디 모두 가져오기
            List<RoomDto> roomList = roomService.findAllRoom(userId);

            // 각 방의 유저 목록
            for (RoomDto room:roomList) {
                // 방 정보
                RoomRes roomRes = mapper.map(room, RoomRes.class);
                // 유저 목록 추가
                List<UserDto> userList= roomService.getRoomMember(room.getRoomId());
                roomRes.setUserList(userList);
                roomRes.setNumberUser(userId.length());
                res.add(roomRes);
            }


        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }


    // 한 채팅방의 채팅 내역
    @GetMapping("/message/{roomId}")
    @Operation(summary = "채팅 내역", description  = "roomId로 채팅방 채팅 내역 조회")
    public ResponseEntity<List<MessageDto>> rooms(@PathVariable("roomId") Long roomId) {
        List<MessageDto> list = msgService.getMessageList(roomId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }


    // 채팅방 나가기
    @DeleteMapping("/{roomId}/{userId}")
    @Operation(summary = "채팅 나가기", description  = "")
    public ResponseEntity exit(@PathVariable("roomId") Long roomId, @PathVariable("userId") String userId) {
        // ^^ 디비 목록에서 제거해주자
        if(roomService.exitChatRoom(roomId, userId))
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    // 메세지 저장
    @PostMapping("/message")
    @Operation(summary = "메시지 저장", description  = "[프론트]")
    public ResponseEntity exit(MessageReq req) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        MessageDto dto = mapper.map(req, MessageDto.class);
        msgService.addMessage(dto);
        return new ResponseEntity(HttpStatus.OK);
    }
}