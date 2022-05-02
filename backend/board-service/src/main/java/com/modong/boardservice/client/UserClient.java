package com.modong.boardservice.client;

import com.modong.boardservice.response.UserResDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user", url = "https://k6e102.p.ssafy.io:8000/user-service/")
public interface UserClient {

    @GetMapping(value = "/{userId}")
    UserResDTO getUser(@PathVariable String userId);
}