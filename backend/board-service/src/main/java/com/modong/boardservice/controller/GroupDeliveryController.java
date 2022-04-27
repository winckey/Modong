package com.modong.boardservice.controller;

import com.modong.boardservice.dto.DeliveryRequest;
import com.modong.boardservice.service.GroupDeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
@RequiredArgsConstructor
public class GroupDeliveryController {

    private final GroupDeliveryService groupDeliveryService;

//    @PostMapping()
//    public ResponseEntity createDelivery(@RequestBody DeliveryRequest) {
//
//
//    }
}
