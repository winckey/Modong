package com.modong.boardservice.client;

import com.modong.boardservice.request.BoardReqDTO;
import com.modong.boardservice.response.UserResDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "crawling-service", url = "http://k6e102.p.ssafy.io:8000/crawling-service")
public interface CrawlingClient {

    @PostMapping
    void crawlingMenu(@RequestBody String boardId);

    @GetMapping(("/{boardId}"))
    Object getMenu(@PathVariable String boardId);
}