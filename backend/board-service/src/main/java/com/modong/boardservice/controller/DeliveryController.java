package com.modong.boardservice.controller;

import com.modong.boardservice.request.DeliveryReqDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/board-service/group-delivery")
@RestController
public class DeliveryController {
    //글 등록
    @PostMapping
    public ResponseEntity deliveryCreate(@RequestBody DeliveryReqDTO deliveryReqDTO) {



        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity deliveryDelete(@RequestBody DeliveryReqDTO deliveryReqDTO) {



        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 글 수정
    @PutMapping
    public ResponseEntity deliveryUpdate(@RequestBody DeliveryReqDTO deliveryReqDTO) {


        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping
    public ResponseEntity deliveryList(@PageableDefault(page = 0, size = 2) Pageable pageable) {


        return new ResponseEntity<>(1, HttpStatus.OK);
    }

    //상세 조회
    @GetMapping("/{deliveryId}/{userId}")
    public ResponseEntity deliveryRead(@PathVariable("deliveryId") Long deliveryId, @PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable("userId") Long userId) {

        return new ResponseEntity<>(1, HttpStatus.OK);
    }
}
