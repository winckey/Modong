package com.modong.orderserivce;

import com.modong.orderserivce.dto.ReqIdOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;

import java.util.List;

public interface OrderService {


    Orders createOreder(ReqOrderDto reqOrderDto);

    void deleteOrder(ReqIdOrderDto reqDeleteOrderDto);


    List<ReqOrderDto> getOrderByUserId(Long userId , OrderType orderType);


    List<ReqOrderDto> getOrderByBoardId(Long boadId , OrderType orderType);

    List<ReqOrderDto> deleteOrderByBoardId(Long boadId, OrderType orderType);


}
