package com.modong.orderserivce.controller;

import com.modong.orderserivce.dto.ReqDeleteOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequestMapping("/order-service")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;


    @PostMapping("/")
    @Operation(summary = "주문 참가", description  = "주문 추가 ")
    public ResponseEntity<ReqOrderDto> createOrder(@RequestBody ReqOrderDto reqOrderDto) {

        orderService.createOreder(reqOrderDto);



        return ResponseEntity.ok(reqOrderDto);
    }

    @DeleteMapping("/")
    @Operation(summary = "주문 참가", description  = "주문 추가 ")
    public ResponseEntity<ReqDeleteOrderDto> deleteOrder(@RequestBody ReqDeleteOrderDto reqDeleteOrderDto) {

        orderService.deleteOrder(reqDeleteOrderDto);



        return ResponseEntity.ok(reqDeleteOrderDto);
    }

}
