package com.modong.boardservice.service;

import com.modong.boardservice.client.CrawlingClient;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("deliveryService")
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    DeliveryRepositoryImpl deliveryRepositoryImpl;

    @Autowired
    UserClientService userClientService;

    @Autowired
    CrawlingClient crawlingClient;

    @Override
    public Delivery createDelivery(DeliveryReqDTO deliveryReqDTO) {

        String[] urlList = deliveryReqDTO.getUrl().split("/");

        Map<String,String> map = new HashMap<>();
        String url = urlList[urlList.length-1];

        map.put("board_id", url);

        Delivery delivery = Delivery.builder()
                .url(url)
                .storeName(deliveryReqDTO.getStoreName())
                .pickupLocation(deliveryReqDTO.getPickupLocation())
                .closeTime(deliveryReqDTO.getCloseTime())
                .userId(deliveryReqDTO.getUserId())
                .build();

        crawlingClient.crawlingMenu(map);


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

    @Override
    public Page<DeliveryResDTO> myDeliveryListCalling(Pageable pageable, Long userId) {
        Page<Delivery> deliveries = deliveryRepositoryImpl.findAllByTimeLimitAndByUserId(pageable, userId);
        UserResDTO user = userClientService.getUser(userId);

        List<DeliveryResDTO> deliveryResDTOS = new ArrayList<>();

        for (Delivery d :deliveries.getContent() ) {
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

    @Override
    public DeliveryResDTO getDeliveryOne(Long id) {

        Delivery delivery = deliveryRepository.getById(id);;
        DeliveryResDTO deliveryResDTO = DeliveryResDTO.builder()
                .id(delivery.getId())
                .url(delivery.getUrl())
                .closeTime(delivery.getCloseTime())
                .pickupLocation(delivery.getPickupLocation())
                .storeName(delivery.getStoreName())
                .build();
        return deliveryResDTO;
    }
}
