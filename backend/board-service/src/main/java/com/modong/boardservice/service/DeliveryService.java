package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Delivery;
import com.modong.boardservice.request.DeliveryReqDTO;
import com.modong.boardservice.response.DeliveryResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DeliveryService {

//  게시글 등록
    Delivery createDelivery(DeliveryReqDTO deliveryReqDTO);

//  게시글 삭제
    Delivery deleteDelivery(Long id);

//  게시글 목록 불러오기
    Page<DeliveryResDTO> deliveryListCalling(Pageable pageable, Long userId);


    Page<DeliveryResDTO> myDeliveryListCalling(Pageable pageable, Long userId);

    DeliveryResDTO getDeliveryOne(Long id);
}
