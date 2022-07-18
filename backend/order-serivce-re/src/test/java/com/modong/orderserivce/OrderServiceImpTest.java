package com.modong.orderserivce;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;
import com.modong.orderserivce.repository.OrderRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.BDDMockito.*;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;



@TestInstance(TestInstance.Lifecycle.PER_CLASS)//객체 생성전략 변경 한개ㅂ만 생성하도록!
@ExtendWith({MockitoExtension.class})
class OrderServiceImpTest {



    @InjectMocks
    OrderService orderService;

    @Mock // junit5는 di를 스스로 지원 다른방식은 junit이 먼저 생성자를 생성하려 해서 안댐
    OrderRepository orderRepository;
    @Mock
    BoardClient boardClient;
    @Mock
    UserClient userClient;




    @Test
    void createOreder() {
        //given
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
        Orders orders1 = orderRepository.findById(orders.getId()).get();

        //then
        assertEquals( OrderType.ORDER_DELIVERY, orders.getOrderType());
        assertEquals( 1L, orders.getBoardId());


    }

    @Test
    void deleteOrder() {

    }
}