package com.modong.boardservice.controller;

import com.modong.boardservice.db.entity.Delivery;
import com.modong.boardservice.db.entity.Purchase;
import com.modong.boardservice.request.PurchaseReqDTO;
import com.modong.boardservice.response.PurchaseResDTO;
import com.modong.boardservice.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RequestMapping("/board-service/group-purchase")
@RestController
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    //글 등록
    @PostMapping
    public ResponseEntity purchaseCreate(@RequestBody PurchaseReqDTO purchaseReqDTO) {
        // 시간 보정
        LocalDateTime realTime = purchaseReqDTO.getCloseTime().plusHours(9);
        purchaseReqDTO.setCloseTime(realTime);
        
        purchaseService.createPurchase(purchaseReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity purchaseDelete(@RequestBody PurchaseReqDTO purchaseReqDTO) {

        purchaseService.deletePurchase(purchaseReqDTO.getId());

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping("/list/{userId}")
    public ResponseEntity purchaseList(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable Long userId) {


        return new ResponseEntity<>(purchaseService.purchaseListCalling(pageable, userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity myPurchaseList(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable Long userId) {


        return new ResponseEntity<>(purchaseService.myPurchaseListCalling(pageable, userId), HttpStatus.OK);
    }

    // 게시글 한개씩 보기
    @GetMapping("/read/{id}")
    public ResponseEntity purchaseRead(@PathVariable("id") Long id) {

        PurchaseResDTO purchaseResDTO = purchaseService.getPurchaseOne(id);
        return new ResponseEntity<>(purchaseResDTO, HttpStatus.OK);
    }
}
