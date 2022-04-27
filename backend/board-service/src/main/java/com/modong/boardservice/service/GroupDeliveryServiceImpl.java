package com.modong.boardservice.service;

import com.modong.boardservice.dto.DeliveryRequest;
import com.modong.boardservice.entity.Board;
import com.modong.boardservice.entity.GroupDelivery;
import com.modong.boardservice.repository.BoardRepository;
import com.modong.boardservice.repository.GroupDeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupDeliveryServiceImpl implements GroupDeliveryService {

    private final BoardRepository boardRepository;
    private final GroupDeliveryRepository groupDeliveryRepository;

    @Override
    public void createDelivery(DeliveryRequest deliveryRequest) {
        Board board = Board.builder()
                .description(deliveryRequest.getDescription())
                .userId(deliveryRequest.getUserId())
                .build();

        boardRepository.save(board);

        // 날짜 스트링 -> LocalDateTime 변환해야 후 저장
//        String closeTime = deliveryRequest.getCloseTime();

        GroupDelivery groupDelivery = GroupDelivery.builder()
                .board(board)
                .storeName(deliveryRequest.getStoreName())
//                .closeTime(closeTime)
                .minPrice(deliveryRequest.getMinPrice())
                .pickupLocation(deliveryRequest.getPickupLocation())
                .url(deliveryRequest.getUrl())
                .build();


    }
}
