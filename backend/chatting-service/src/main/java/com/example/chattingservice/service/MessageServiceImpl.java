package com.example.chattingservice.service;

import com.example.chattingservice.data.entity.MessageEntity;
import com.example.chattingservice.data.entity.RoomEntity;
import com.example.chattingservice.data.entity.UserEntity;
import com.example.chattingservice.repository.MessageRepository;
import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.repository.UserRepository;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository msgRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<MessageDto> getMessageList(Long roomId) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // 조회
        List<MessageEntity> list =  msgRepository.findByRoomId(roomId).get();

        List<MessageDto> res = new ArrayList<>();
        for (MessageEntity entity:list) {
            MessageDto msg = mapper.map(entity, MessageDto.class);
            msg.setRoomId(entity.getRoom().getId());
            msg.setUserId(entity.getUser().getUserId());
            msg.setUserName(entity.getUser().getUserName());

            System.out.println("==============================================================");
            System.out.println(msg.getDate().toString());

            res.add(msg);
        }

        return res;
    }

    @Override
    public boolean addMessage(MessageDto dto) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            // user조회
            UserEntity user = userRepository.findByRoomIdAndUserId(dto.getRoomId(), dto.getUserId()).get();
            // room조회
            RoomEntity room = user.getRoom();

            MessageEntity entity = mapper.map(dto, MessageEntity.class);
            entity.setUser(user);
            entity.setRoom(room);
            msgRepository.save(entity);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
