package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Delivery;
import com.modong.boardservice.db.repository.BoardRepositoryImpl;
import com.modong.boardservice.db.repository.DeliveryRepository;
import com.modong.boardservice.request.DeliveryReqDTO;
import com.modong.boardservice.response.DeliveryResDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("deliveryService")
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    DeliveryRepository deliveryRepository;


    @Override
    public Delivery createDelivery(DeliveryReqDTO deliveryReqDTO) {

        Delivery delivery = Delivery.DeliveryBuilder()
                .description(deliveryReqDTO.getDescription())
                .userId(deliveryReqDTO.getUserId())
                .closeTime(deliveryReqDTO.getCloseTime())
                .minPrice(deliveryReqDTO.getMinPrice())
                .pickupLocation(deliveryReqDTO.getPickupLocation())
                .storeName(deliveryReqDTO.getStoreName())
                .url(deliveryReqDTO.getUrl())
                .build();


        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery deleteDelivery(DeliveryReqDTO deliveryReqDTO) {

        Delivery delivery = deliveryRepository.getById(deliveryReqDTO.getBoardId());

        delivery.setDeleted(true);


        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery updateDelivery(DeliveryReqDTO deliveryReqDTO) {
        Delivery delivery = deliveryRepository.getById(deliveryReqDTO.getBoardId());

        delivery.setDeleted(true);

        return deliveryRepository.save(delivery);

    }

    @Override
    public Page<DeliveryResDTO> deliveryListCalling(Pageable pageable) {



        return  null;
    }
}
