package com.modong.boardservice.client;

import com.modong.boardservice.response.UserResDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://k6e102.p.ssafy.io:8000/user-service")
public interface UserClient {

    @GetMapping(value = "/users/{userId}")
    UserResDTO getUser(@PathVariable("userId") Long userId);
}