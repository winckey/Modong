package com.modong.orderserivce.service;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;


//@DataJpaTest//https://webcoding-start.tistory.com/20
@DataJpaTest
@ExtendWith({MockitoExtension.class , SpringExtension.class})
@ActiveProfiles("test")
class OrderServiceImpTest {


    @Autowired // junit5는 di를 스스로 지원 다른방식은 junit이 먼저 생성자를 생성하려 해서 안댐
    OrderRepository orderRepository;
    @Mock
    BoardClient boardClient;
    @Mock
    UserClient userClient;

//    @Test
    void createOreder() {
        //given
        OrderService orderService = new OrderServiceImp(orderRepository , boardClient , userClient);

        OptionDto optionDto = OptionDto.builder()
                .optionContent("option")
                .build();
        ItemDto itemDto = ItemDto.builder()
                .price(1000)
                .quantity(1)
                .itemContent("item")
                .options(new ArrayList<>())
                .build();
        itemDto.getOptions().add(optionDto);
        ReqOrderDto reqOrderDto = ReqOrderDto.builder()
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .itemDtoList(new ArrayList<>())
                .build();
        reqOrderDto.getItemDtoList().add(itemDto);

        //when

        orderService.createOreder(reqOrderDto);


        //then
//        assertEquals(testOrdser , order);

    }

    @Test
    void test() {
        System.out.println("test");
    }


}