package com.modong.orderserivce.client;

import com.modong.orderserivce.dto.BoardDto;
import com.modong.orderserivce.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://k6e102.p.ssafy.io:8000/user-service")
public interface UserClient {

    @GetMapping(value = "/users/{userId}")
    UserDto getDelivery(@PathVariable("userId") Long userId);



}