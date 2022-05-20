package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.BoardDto;
import com.modong.orderserivce.dto.ReqIdOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.dto.UserDto;
import com.modong.orderserivce.entity.OrderType;

import java.util.List;

public interface OrderService {


    void createOreder(ReqOrderDto reqOrderDto);

    void deleteOrder(ReqIdOrderDto reqDeleteOrderDto);


    List<ReqOrderDto> getOrderByUserId(Long userId , OrderType orderType);


    List<ReqOrderDto> getOrderByBoardId(Long boadId , OrderType orderType);

    List<ReqOrderDto> deleteOrderByBoardId(Long boadId, OrderType orderType);


}
