package com.modong.orderserivce.client;

import com.modong.orderserivce.dto.BoardDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "board-service", url = "http://k6e102.p.ssafy.io:8000/board-service")
public interface BoardClient {

    @GetMapping(value = "/group-delivery/read/{boardId}")
    BoardDto getDelivery(@PathVariable("boardId") Long boardId);


    @GetMapping(value = "/group-purchase/read/{boardId}")
    BoardDto getPurchase(@PathVariable("boardId") Long boardId);
}