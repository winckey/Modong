package com.modong.orderserivce.service;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.*;
import com.modong.orderserivce.entity.Items;
import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService {


    private final OrderRepository orderRepository;
    private final BoardClient boardClient;
    private final UserClient userClient;

    @Override
    public Order createOreder(ReqOrderDto reqOrderDto) {


        Order order = Order.builder()
                .userId(reqOrderDto.getUserId())
                .boardId(reqOrderDto.getBoardId())
                .orderType(reqOrderDto.getOrderType())
                .build();

        for (ItemDto itemDto : reqOrderDto.getItemDtoList()) {
            Items items = Items.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(order)
                    .quantity(itemDto.getQuantity())
                    .price(itemDto.getPrice())
                    .build();


            for (OptionDto optionDto : itemDto.getOptions()) {
                Option option = Option.builder()
                        .optionContent(optionDto.getOptionContent())
                        .items(items)
                        .build();

                option.changeItem(items);
            }

            items.changeOrder(order);
        }

        return orderRepository.save(order);

    }

    @Override
    public void deleteOrder(ReqIdOrderDto reqDeleteOrderDto) {

        Order order = orderRepository.findById(reqDeleteOrderDto.getOrderId()).get();
        orderRepository.delete(order);// 여기 쿼리 4번나감 왜죠?
    }

    @Override
    public List<ReqOrderDto> getOrderByUserId(Long userId, OrderType orderType) {

        List<Order> orderList = null;

        if (orderType.equals(OrderType.ORDER_ALL))
            orderList = orderRepository.findByUserId(userId);
        else
            orderList = orderRepository.findByUserIdAndOrderType(userId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Order order : orderList) {
//            ReqOrderDto reqOrderDto = ReqOrderDto.of(order);
//            reqOrderDto.setBoardDto(getBoard(orderType , order.getBoardId())); // boarddto가 null임
//            reqOrderDtos.add(reqOrderDto);
            BoardDto boardDto = getBoard(order.getOrderType(), order.getBoardId());
            UserDto userDto =getUser(order.getUserId());


            ReqOrderDto reqOrderDto = ReqOrderDto.of(order);
            reqOrderDto.setBoardDto(boardDto);
            reqOrderDto.setUserDto(userDto);
            reqOrderDtos.add(reqOrderDto);
        }

        return reqOrderDtos;
    }

    public BoardDto getBoard(OrderType orderType, Long boardId) {

        switch (orderType) {
            case ORDER_DELIVERY:
                return boardClient.getDelivery(boardId);
            case ORDER_GROUP:
                return boardClient.getPurchase(boardId);
            default:
                return null;
        }


    }

    private UserDto getUser(Long userId) {

        return userClient.getDelivery(userId);


    }

    @Override
    public List<ReqOrderDto> getOrderByBoardId(Long boadId, OrderType orderType) {
        List<Order> orderList = orderRepository.findByBoardIdAndOrderType(boadId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Order order : orderList) {
            ReqOrderDto reqOrderDto = ReqOrderDto.of(order);
            reqOrderDto.setUserDto(getUser(order.getUserId()));
            reqOrderDtos.add(reqOrderDto);

        }

        return reqOrderDtos;
    }

    @Override
    public List<ReqOrderDto> deleteOrderByBoardId(Long boadId, OrderType orderType) {
        List<Order> orderList = orderRepository.findByBoardIdAndOrderType(boadId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Order order : orderList) {
            ReqOrderDto reqOrderDto = ReqOrderDto.builder()
                    .boardId(order.getBoardId())
                    .userId(order.getUserId())
                    .orderType(order.getOrderType())
                    .build();
            reqOrderDto.setUserDto(getUser(order.getUserId()));
            reqOrderDtos.add(reqOrderDto);

        }
        orderRepository.deleteByBoardId(reqOrderDtos.get(0).getBoardId());
        return reqOrderDtos;
    }
}
