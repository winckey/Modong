package com.example.chattingservice.service;

import com.example.chattingservice.data.entity.MessageEntity;
import com.example.chattingservice.repository.MessageRepository;
import com.example.chattingservice.data.dto.MessageDto;
import com.example.chattingservice.data.dto.RoomDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository msgRepository;

    @Override
    public List<MessageDto> getMessageList(Long roomId) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageEntity> list =  msgRepository.findByRoomId(roomId).get();
        List<MessageDto> res = new ArrayList<>();
        for (MessageEntity entity:list) {
            res.add(mapper.map(entity, MessageDto.class));
        }

        return res;
    }

    @Override
    public boolean addMessage(MessageDto dto) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            MessageEntity entity = mapper.map(dto, MessageEntity.class);
            msgRepository.save(entity);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
