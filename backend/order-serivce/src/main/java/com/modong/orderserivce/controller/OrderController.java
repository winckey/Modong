package com.modong.orderserivce.controller;

import com.modong.orderserivce.dto.ReqIdOrderDto;
import com.modong.orderserivce.dto.ReqOrderDto;
import com.modong.orderserivce.service.OrderService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @DeleteMapping("/order")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "reqIdOrderDto", value = "orderId 만사용해서 요청", required = true)
    })
    @Operation(summary = "주문 조회 사용자", description  = "주문 단위 삭제")
    public ResponseEntity<ReqIdOrderDto> deleteOrder(@RequestBody ReqIdOrderDto reqIdOrderDto) {

        orderService.deleteOrder(reqIdOrderDto);



        return ResponseEntity.ok(reqIdOrderDto);
    }


    @GetMapping("/user")
    @Operation(summary = "주문 조회 사용자", description  = "주문 사용자 단위 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "reqIdOrderDto", value = "userId 만사용해서 요청", required = true)
    })
    public ResponseEntity<ReqIdOrderDto> getOrder(@RequestBody ReqIdOrderDto reqDeleteOrderDto) {

        orderService.deleteOrder(reqDeleteOrderDto);



        return ResponseEntity.ok(reqDeleteOrderDto);
    }
}
