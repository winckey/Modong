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
    Delivery deleteDelivery(DeliveryReqDTO deliveryReqDTO);

//  게시글 수정
    Delivery updateDelivery(DeliveryReqDTO deliveryReqDTO);

//  게시글 목록 불러오기
    Page<DeliveryResDTO> deliveryListCalling(Pageable pageable);


}
