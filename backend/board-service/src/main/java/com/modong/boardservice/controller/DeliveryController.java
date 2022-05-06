package com.modong.boardservice.controller;

import com.modong.boardservice.request.DeliveryReqDTO;
import com.modong.boardservice.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/board-service/group-delivery")
@RestController
public class DeliveryController {
    @Autowired
    DeliveryService deliveryService;

    //글 등록
    @PostMapping
    public ResponseEntity deliveryCreate(@RequestBody DeliveryReqDTO deliveryReqDTO) {


        deliveryService.createDelivery(deliveryReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity deliveryDelete(@RequestBody Long id) {

        deliveryService.deleteDelivery(id);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping
    public ResponseEntity deliveryList(@PageableDefault(page = 0, size = 10) Pageable pageable) {


        return new ResponseEntity<>(deliveryService.deliveryListCalling(pageable), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity myDeliveryList(@PageableDefault(page = 0, size = 10) Pageable pageable, Long userId) {


        return new ResponseEntity<>(deliveryService.myDeliveryListCalling(pageable, userId), HttpStatus.OK);
    }

}
