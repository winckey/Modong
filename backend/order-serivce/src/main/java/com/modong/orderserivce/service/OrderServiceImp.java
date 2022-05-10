package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.OptionDto;
import com.modong.orderserivce.dto.ReqIdOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService{


    private final OrderRepository orderRepository;

    @Override
    public void createOreder(ReqOrderDto reqOrderDto) {



        Order order = Order.builder()
                .userId(reqOrderDto.getUserId())
                .boardId(reqOrderDto.getBoardId())
                .orderType(reqOrderDto.getOrderType())
                .build();

        for (ItemDto itemDto : reqOrderDto.getItemDtoList())
        {
            Item item =Item.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(order)
                    .quantity(itemDto.getQuantity())
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
    public void deleteOrder(ReqIdOrderDto reqDeleteOrderDto) {

        Order order = orderRepository.findById(reqDeleteOrderDto.getOrderId()).get();
        orderRepository.delete(order);// 여기 쿼리 4번나감 왜죠?
    }

    @Override
    public List<ReqOrderDto> getOrderByUserId(Long userId , OrderType orderType) {

        List<Order> orderList = null;

        if(orderType.equals(OrderType.ORDER_ALL))
            orderList = orderRepository.findByUserId(userId);
        else
            orderList = orderRepository.findByUserIdAndOrderType(userId , orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Order order: orderList)
        {
            reqOrderDtos.add(ReqOrderDto.of(order));
        }

        return reqOrderDtos;
    }
}
