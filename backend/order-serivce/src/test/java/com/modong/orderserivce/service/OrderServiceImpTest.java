package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;
import com.modong.orderserivce.entity.OrderType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OrderServiceImpTest {

    @Test
    void createOreder() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then
        for (ItemDto itemDto : reqOrderDto.getItemDtoList()) {
            Item item = Item.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(order)
                    .quantity(itemDto.getQuantity())
                    .price(itemDto.getPrice())
                    .build();


            for (OptionDto optionDto : itemDto.getOptions()) {
                Option option = Option.builder()
                        .optionContent(optionDto.getOptionContent())
                        .item(item)
                        .build();

                option.changeItem(item);
            }

            item.changeOrder(order);
        }

        orderRepository.save(order);
    }

    @Test
    void deleteOrder() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then

    }

    @Test
    void getOrderByUserId() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then

    }

    @Test
    void getBoard() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then

    }


    @Test
    void getOrderByBoardId() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then

    }

    @Test
    void deleteOrderByBoardId() {
        //given
        Order order = Order.builder()
                .id(1L)
                .boardId(1L)
                .orderType(OrderType.ORDER_DELIVERY)
                .build();
        //when




        //then

    }
}