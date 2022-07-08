package com.modong.orderserivce.service;

import com.modong.orderserivce.client.BoardClient;
import com.modong.orderserivce.client.UserClient;
import com.modong.orderserivce.dto.*;
import com.modong.orderserivce.entity.Orders;
import com.modong.orderserivce.entity.Prodocts;
import com.modong.orderserivce.entity.Option;
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
    public Orders createOreder(ReqOrderDto reqOrderDto) {


        Orders orders = com.modong.orderserivce.entity.Orders.builder()
                .userId(reqOrderDto.getUserId())
                .boardId(reqOrderDto.getBoardId())
                .orderType(reqOrderDto.getOrderType())
                .build();

        for (ItemDto itemDto : reqOrderDto.getItemDtoList()) {
            Prodocts prodocts = Prodocts.builder()
                    .itemContent(itemDto.getItemContent())
                    .orders(orders)
                    .quantity(itemDto.getQuantity())
                    .price(itemDto.getPrice())
                    .build();


            for (OptionDto optionDto : itemDto.getOptions()) {
                Option option = Option.builder()
                        .optionContent(optionDto.getOptionContent())
                        .prodocts(prodocts)
                        .build();
            }
        }

        return orderRepository.save(orders);

    }

    @Override
    public void deleteOrder(ReqIdOrderDto reqDeleteOrderDto) {

        Orders orders = orderRepository.findById(reqDeleteOrderDto.getOrderId()).get();
        orderRepository.delete(orders);// 여기 쿼리 4번나감 왜죠?
    }

    @Override
    public List<ReqOrderDto> getOrderByUserId(Long userId, OrderType orderType) {

        List<Orders> ordersList = null;

        if (orderType.equals(OrderType.ORDER_ALL))
            ordersList = orderRepository.findByUserId(userId);
        else
            ordersList = orderRepository.findByUserIdAndOrderType(userId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Orders orders : ordersList) {
//            ReqOrderDto reqOrderDto = ReqOrderDto.of(order);
//            reqOrderDto.setBoardDto(getBoard(orderType , order.getBoardId())); // boarddto가 null임
//            reqOrderDtos.add(reqOrderDto);
            BoardDto boardDto = getBoard(orders.getOrderType(), orders.getBoardId());
            UserDto userDto =getUser(orders.getUserId());


            ReqOrderDto reqOrderDto = ReqOrderDto.of(orders);
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
        List<Orders> ordersList = orderRepository.findByBoardIdAndOrderType(boadId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Orders orders : ordersList) {
            ReqOrderDto reqOrderDto = ReqOrderDto.of(orders);
            reqOrderDto.setUserDto(getUser(orders.getUserId()));
            reqOrderDtos.add(reqOrderDto);

        }

        return reqOrderDtos;
    }

    @Override
    public List<ReqOrderDto> deleteOrderByBoardId(Long boadId, OrderType orderType) {
        List<Orders> ordersList = orderRepository.findByBoardIdAndOrderType(boadId, orderType);

        List<ReqOrderDto> reqOrderDtos = new ArrayList<>();

        for (Orders orders : ordersList) {
            ReqOrderDto reqOrderDto = ReqOrderDto.builder()
                    .boardId(orders.getBoardId())
                    .userId(orders.getUserId())
                    .orderType(orders.getOrderType())
                    .build();
            reqOrderDto.setUserDto(getUser(orders.getUserId()));
            reqOrderDtos.add(reqOrderDto);

        }
        orderRepository.deleteByBoardId(reqOrderDtos.get(0).getBoardId());
        return reqOrderDtos;
    }
}
