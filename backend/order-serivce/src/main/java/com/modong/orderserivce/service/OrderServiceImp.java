package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqDeleteOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;
import com.modong.orderserivce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService{


    private final OrderRepository orderRepository;

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

                option.changeItem(item);
            }

            item.changeOrder(order);
        }

        orderRepository.save(order);

    }

    @Override
    public void deleteOrder(ReqDeleteOrderDto reqDeleteOrderDto) {

        Order order = orderRepository.findById(reqDeleteOrderDto.getOrderId()).get();
        orderRepository.delete(order);// 여기 쿼리 4번나감 왜죠?
    }
}
