package com.modong.orderserivce.service;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.*;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;
import com.modong.orderserivce.repository.OrderRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.times;


//@DataJpaTest//https://webcoding-start.tistory.com/20
@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)//객체 생성전략 변경 한개ㅂ만 생성하도록!
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ExtendWith({MockitoExtension.class})

class OrderServiceImpTest {


    @Autowired // junit5는 di를 스스로 지원 다른방식은 junit이 먼저 생성자를 생성하려 해서 안댐
    OrderRepository orderRepository;
    @Mock
    BoardClient boardClient;
    @Mock
    UserClient userClient;

    @Test
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

        Orders orders = orderService.createOreder(reqOrderDto);


        //then
        assertEquals( OrderType.ORDER_DELIVERY, orders.getOrderType());
        assertEquals( 1L, orders.getBoardId());


    }

    @Test
    void deleteOrder() {
        //given
        OrderService orderService = new OrderServiceImp(orderRepository , boardClient , userClient);

        ReqIdOrderDto reqIdOrderDto = new ReqIdOrderDto(1L,1L,1L);

        Orders orders = Orders.builder()
                .id(1L)
                .boardId(1L)
                .build();

        given(orderRepository.findById(1L)).willReturn(Optional.of(orders));
        //when
        orderService.deleteOrder(reqIdOrderDto);

        //then
        then(orderRepository).should(times(1)).deleteByBoardId(any());
    }

    @Test
    void deleteOrderByBoardId() {
        //given
        OrderService orderService = new OrderServiceImp(orderRepository , boardClient , userClient);

        //when
        orderService.deleteOrderByBoardId(1L , OrderType.ORDER_GROUP);

        //then
        then(orderRepository).should(times(1)).deleteByBoardId(any());
    }
    @Test
    void getBoard() {
        //given
        OrderServiceImp orderServiceImp = new OrderServiceImp(orderRepository , boardClient , userClient);


        //when
        orderServiceImp.getBoard(OrderType.ORDER_DELIVERY , 1L);
        orderServiceImp.getBoard(OrderType.ORDER_GROUP , 1L);
        //then
        then(boardClient).should(times(1)).getDelivery(any());
        then(boardClient).should(times(1)).getPurchase(any());
    }

}