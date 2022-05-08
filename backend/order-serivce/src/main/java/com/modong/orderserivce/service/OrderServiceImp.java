package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;

public class OrderServiceImp implements OrderService{






    @Override
    public void createOreder(ReqOrderDto reqOrderDto) {



        Order order = Order.builder()
                .userId(reqOrderDto.getUserId())
                .boardId(reqOrderDto.getBoardId())
                .build();




        for (ItemDto itemDto : reqOrderDto.getItemDtoList())
        {
            Item item =Item.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(order)
                    .build();


            for (OptionDto optionDto : itemDto.getOptions()){
                Option option = Option.builder()
                        .optionContent(optionDto.getOptionContent())
                        .item(item)
                        .build();
            }
        }



    }
}
