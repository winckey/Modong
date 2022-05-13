package com.example.chattingservice.messagequeue;

import com.example.chattingservice.data.dto.UserDto;
import com.example.chattingservice.data.request.CreateRoomReq;
import com.example.chattingservice.data.response.CreateRoomRes;
import com.example.chattingservice.service.RoomService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class KafkaConsumer {// 실제 토픽을 사용하는 컨슈머
    @Autowired
    RoomService roomService;

    @KafkaListener(topics = "chat-topic")// 어떤 토픽을 들을꺼냐
    public void updateQty(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {
            });
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }

        CreateRoomReq createRoomReq = new CreateRoomReq();
        createRoomReq.setRoomName((String) map.get("roomName"));
        createRoomReq.setRoomType((String) map.get("roomType"));
        createRoomReq.setRoomType((String) map.get("roomType"));

        List<Map> userList = (List<Map>) map.get("userList");

        List<UserDto> userDtoList = new ArrayList<>();

        for (Map userDto : userList) {
            UserDto dto = new UserDto();
            dto.setUserId(Long.parseLong(String.valueOf(userDto.get("id"))));
            dto.setUserName((String) userDto.get("nickname"));
            userDtoList.add(dto);
        }

        createRoomReq.setUserList(userDtoList);

        Long roomId = roomService.createChatRoom(createRoomReq.getRoomName(), createRoomReq.getRoomType());
        roomService.addRoomMember(roomId, createRoomReq.getUserList());
    }
}
