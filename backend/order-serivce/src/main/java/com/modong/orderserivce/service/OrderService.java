package com.modong.orderserivce.service;

import com.modong.orderserivce.dto.ReqIdOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;

public interface OrderService {


    void createOreder(ReqOrderDto reqOrderDto);

    void deleteOrder(ReqIdOrderDto reqDeleteOrderDto);
}
