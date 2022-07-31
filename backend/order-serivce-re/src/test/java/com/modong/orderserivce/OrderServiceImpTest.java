package com.modong.orderserivce;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;
import com.modong.orderserivce.entity.Prodocts;
import com.modong.orderserivce.repository.OrderRepository;
import com.modong.orderserivce.service.OrderServiceImp;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.BDDMockito.*;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;



@TestInstance(TestInstance.Lifecycle.PER_CLASS)//객체 생성전략 변경 한개ㅂ만 생성하도록!
@ExtendWith({MockitoExtension.class})
class OrderServiceImpTest {



    @InjectMocks//https://4whomtbts.tistory.com/129
    OrderServiceImp orderService;

    @Mock // junit5는 di를 스스로 지원 다른방식은 junit이 먼저 생성자를 생성하려 해서 안댐
    OrderRepository orderRepository;
    @Mock
    BoardClient boardClient;
    @Mock
    UserClient userClient;




    @Test
    void createOreder_주문등록() {
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

        Orders ordersEntity = createOrederEntity(reqOrderDto);

        //mocking
        given(orderRepository.save(any())).willReturn(ordersEntity);
        given(orderRepository.findById(any())).willReturn(Optional.ofNullable(ordersEntity));

        //when

        Orders whenOrders = orderService.createOreder(reqOrderDto);


        //then
        Orders findOrders = orderRepository.findById(whenOrders.getId()).get();

        assertEquals( whenOrders.getOrderType(), findOrders.getOrderType());
        assertEquals( whenOrders.getBoardId(), findOrders.getBoardId());

        assertEquals( whenOrders.getProdoctsList().get(0).getPrice(), findOrders.getProdoctsList().get(0).getPrice());
        assertEquals( whenOrders.getProdoctsList().get(0).getOptionList().get(0).getOptionContent(),
                findOrders.getProdoctsList().get(0).getOptionList().get(0).getOptionContent());

    }

    private Orders createOrederEntity(ReqOrderDto reqOrderDto) {

        Orders orders = Orders.builder()
                .userId(reqOrderDto.getUserId())
                .boardId(reqOrderDto.getBoardId())
                .orderType(reqOrderDto.getOrderType())
                .prodoctsList(new ArrayList<>())
                .build();

        for (ItemDto itemDto : reqOrderDto.getItemDtoList()) {
            Prodocts prodocts = Prodocts.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(orders)
                    .quantity(itemDto.getQuantity())
                    .price(itemDto.getPrice())
                    .optionList(new ArrayList<>())
                    .build();

            orders.getProdoctsList().add(prodocts);
            for (OptionDto optionDto : itemDto.getOptions()) {
                Option option = Option.builder()
                        .optionContent(optionDto.getOptionContent())
                        .prodocts(prodocts)
                        .build();
                orders.getProdoctsList().get(0).getOptionList().add(option);
            }
        }

        return orders;
    }

    @Test
    void deleteOrder() {

    }
}