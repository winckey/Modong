package com.example.chattingservice.service;

import com.example.chattingservice.data.dto.RoomDto;
import com.example.chattingservice.data.dto.RoomUserDto;
import com.example.chattingservice.data.dto.UserDto;
import com.example.chattingservice.data.entity.RoomEntity;
import com.example.chattingservice.data.entity.UserEntity;
import com.example.chattingservice.repository.RoomRepository;
import com.example.chattingservice.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    RoomRepository roomRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Long createChatRoom(String roomName, String type) {
        RoomDto dto = RoomDto.create(roomName, type);

        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // entity화-저장
        RoomEntity entity = mapper.map(dto, RoomEntity.class);
        try{
            roomRepository.save(entity);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

        return entity.getId();
    }

    @Override
    public boolean addRoomMember(Long roomId, List<UserDto> userList) {

        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            for (UserDto user:userList) {
                RoomUserDto dto = new RoomUserDto(roomId, user);
                UserEntity entity = mapper.map(dto, UserEntity.class);
                userRepository.save(entity);
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<UserDto> getRoomMember(Long roomId) {

        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            // 반환용 리스트
            List<UserDto> res = new ArrayList<>();
            // DB에서 유저목록 가져오기
            List<UserEntity> userList = userRepository.findByRoomId(roomId).get();
            for(UserEntity entity:userList){
                UserDto user = mapper.map(entity, UserDto.class);
                res.add(user);
            }

            return res;

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<RoomDto> findAllRoom(Long userId) {
        // 매퍼생성
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<RoomDto> res = new ArrayList<>();
        try{
            // 유저가 참여중인 방 목록 가져옴
            List<UserEntity> list = userRepository.findByUserId(userId).get();

            for(UserEntity user:list){
                RoomEntity entity = roomRepository.findById(user.getRoomId()).get();
                RoomDto dto = mapper.map(entity, RoomDto.class);
                dto.setRoomId(entity.getId());
                res.add(dto);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return res;
    }

    @Override
    public boolean exitChatRoom(Long roomId, Long userId) {
        try {
            UserEntity entity = userRepository.findByRoomIdAndUserId(roomId, userId).get();
            userRepository.delete(entity);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }

}
