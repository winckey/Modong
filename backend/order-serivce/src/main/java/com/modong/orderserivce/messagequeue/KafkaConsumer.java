package com.modong.orderserivce.messagequeue;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.ChatDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.dto.UserDto;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
//
@Service
@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class KafkaConsumer {// 실제 토픽을 사용하는 컨슈머

    private final OrderService orderService;
    private final KafkaProducer kafkaProducer;
    private final UserClient userClient;

    @KafkaListener(topics = "order-topic")// 어떤 토픽을 들을꺼냐
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

        OrderType orderType = OrderType.valueOf((String) map.get("orderType"));
        Long boardId = Long.parseLong(String.valueOf(map.get("id")));
        Long userId = Long.parseLong(String.valueOf(map.get("userId")));
        UserDto userTemp = userClient.getDelivery(userId);


        List<ReqOrderDto> reqOrderDtoList= orderService.deleteOrderByBoardId(boardId , orderType);
        ChatDto chatDto = new ChatDto();
        chatDto.setRoomName((String) map.get("name"));
        chatDto.setRoomType((String) map.get("orderType"));
        List<UserDto> userDto = new ArrayList<>();
        userDto.add(new UserDto(userTemp.getId() , userTemp.getImage() , userTemp.getNickname()));
        for (int i=0 ; i<reqOrderDtoList.size() ; i++)
        {
            userDto.add(new UserDto(reqOrderDtoList.get(i).getUserDto().getId(),reqOrderDtoList.get(i).getUserDto().getImage() , reqOrderDtoList.get(i).getUserDto().getNickname()));
        }
        chatDto.setUserList(userDto);


        kafkaProducer.send("chat-topic", chatDto);

//        CatalogEntity entity = repository.findByProductId((String)map.get("productId"));
//        if (entity != null) {
//            entity.setStock(entity.getStock() - (Integer)map.get("qty"));
//            repository.save(entity);
//        }
//
//
//        Long roomId = roomService.createChatRoom(req.getRoomName(), req.getRoomType());
//        roomService.addRoomMember(roomId, req.getUserList());
//        res = new CreateRoomRes(roomId);
    }

    @KafkaListener(topics = "testTopic")// 어떤 토픽을 들을꺼냐
    public void updateQty2(String kafkaMessage) {
        log.info("Kafka Message: ->" + kafkaMessage);
    }
}
