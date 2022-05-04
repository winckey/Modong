package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Delivery;
import com.modong.boardservice.db.repository.DeliveryRepository;
import com.modong.boardservice.db.repository.DeliveryRepositoryImpl;
import com.modong.boardservice.request.DeliveryReqDTO;
import com.modong.boardservice.response.DeliveryResDTO;
import com.modong.boardservice.response.UserResDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("deliveryService")
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    DeliveryRepositoryImpl deliveryRepositoryImpl;

    @Autowired
    UserClientService userClientService;


    @Override
    public Delivery createDelivery(DeliveryReqDTO deliveryReqDTO) {

        Delivery delivery = Delivery.builder()
                .url(deliveryReqDTO.getUrl())
                .storeName(deliveryReqDTO.getStoreName())
                .pickupLocation(deliveryReqDTO.getPickupLocation())
                .closeTime(deliveryReqDTO.getCloseTime())
                .userId(deliveryReqDTO.getUserId())
                .build();


        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery deleteDelivery(Long id) {

        Delivery delivery = deliveryRepository.getById(id);

        delivery.setCloseTime(LocalDateTime.now());

        return deliveryRepository.save(delivery);
    }

    @Override
    public Page<DeliveryResDTO> deliveryListCalling(Pageable pageable) {
        Page<Delivery> deliveries = deliveryRepositoryImpl.findAllByTimeLimit(pageable);

        List<DeliveryResDTO> deliveryResDTOS = new ArrayList<>();
        for (Delivery d :deliveries.getContent() ) {
            UserResDTO user = userClientService.getUser(d.getUserId());
            DeliveryResDTO dto = DeliveryResDTO.builder()
                    .id(d.getId())
                    .closeTime(d.getCloseTime())
                    .pickupLocation(d.getPickupLocation())
                    .storeName(d.getStoreName())
                    .url(d.getUrl())
                    .userInfo(user)
                    .build();

            deliveryResDTOS.add(dto);

        }

        return new PageImpl<>(deliveryResDTOS, pageable, deliveries.getTotalElements());
    }
}
