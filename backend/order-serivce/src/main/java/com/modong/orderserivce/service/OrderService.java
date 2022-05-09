package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ReqDeleteOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;

public interface OrderService {


    void createOreder(ReqOrderDto reqOrderDto);

    void deleteOrder(ReqDeleteOrderDto reqDeleteOrderDto);
}
