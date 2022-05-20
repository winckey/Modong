package com.modong.boardservice.controller;

import com.modong.boardservice.db.entity.Delivery;
import com.modong.boardservice.request.DeliveryReqDTO;
import com.modong.boardservice.response.BoardResDTO;
import com.modong.boardservice.response.DeliveryResDTO;
import com.modong.boardservice.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RequestMapping("/board-service/group-delivery")
@RestController
public class DeliveryController {
    @Autowired
    DeliveryService deliveryService;

    //글 등록
    @PostMapping
    public ResponseEntity deliveryCreate(@RequestBody DeliveryReqDTO deliveryReqDTO) {
        // 시간 보정
        LocalDateTime realTime = deliveryReqDTO.getCloseTime().plusHours(9);
        deliveryReqDTO.setCloseTime(realTime);
        deliveryService.createDelivery(deliveryReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity deliveryDelete(@RequestBody DeliveryReqDTO deliveryReqDTO) {

        deliveryService.deleteDelivery(deliveryReqDTO.getId());

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping("/list/{userId}")
    public ResponseEntity deliveryList(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable Long userId) {


        return new ResponseEntity<>(deliveryService.deliveryListCalling(pageable, userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity myDeliveryList(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable Long userId) {


        return new ResponseEntity<>(deliveryService.myDeliveryListCalling(pageable, userId), HttpStatus.OK);
    }

    // 게시글 한개씩 보기
    @GetMapping("/read/{id}")
    public ResponseEntity deliveryRead(@PathVariable("id") Long id) {

        DeliveryResDTO deliveryResDTO = deliveryService.getDeliveryOne(id);
        return new ResponseEntity<>(deliveryResDTO, HttpStatus.OK);
    }
}
