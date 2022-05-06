package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Purchase;
import com.modong.boardservice.db.repository.PurchaseRepository;
import com.modong.boardservice.request.PurchaseReqDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PurchaseServiceImpl implements PurchaseService{

    @Autowired
    PurchaseRepository purchaseRepository;

    @Override
    public void createPurchase(PurchaseReqDTO purchaseReqDTO) {
        Purchase purchase = Purchase.builder()
                .closeTime(purchaseReqDTO.getCloseTime())
                .price(purchaseReqDTO.getPrice())
                .productName(purchaseReqDTO.getProductName())
                .pickupLocation(purchaseReqDTO.getPickupLocation())
                .url(purchaseReqDTO.getUrl())
                .userId(purchaseReqDTO.getUserId())
                .build();
    }

    @Override
    public void deletePurchase(Long id) {

    }


    @Override
    public Object purchaseListCalling(Pageable pageable) {
        return null;
    }

    @Override
    public Object myPurchaseListCalling(Pageable pageable, Long userId) {
        return null;
    }
}
