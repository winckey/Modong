package com.modong.boardservice.service;

import com.modong.boardservice.request.PurchaseReqDTO;
import org.springframework.data.domain.Pageable;

public interface PurchaseService {
    void deletePurchase(Long id);

    void createPurchase(PurchaseReqDTO purchaseReqDTO);

    Object purchaseListCalling(Pageable pageable);

    Object myPurchaseListCalling(Pageable pageable, Long userId);
}
