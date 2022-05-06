package com.modong.boardservice.service;

import com.modong.boardservice.request.PurchaseReqDTO;
import com.modong.boardservice.response.PurchaseResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PurchaseService {
    void deletePurchase(Long id);

    void createPurchase(PurchaseReqDTO purchaseReqDTO);

    Page<PurchaseResDTO> purchaseListCalling(Pageable pageable);

    Page<PurchaseResDTO> myPurchaseListCalling(Pageable pageable, Long userId);
}
