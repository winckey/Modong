package com.modong.boardservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.spring.web.json.Json;

import java.util.Map;

@FeignClient(name = "crawling-service", url = "http://k6e102.p.ssafy.io:8000/crawling-service/delivery")
public interface CrawlingClient {

    @PostMapping
    void crawlingMenu(@RequestBody Map<String,String> url);

    @GetMapping(("/{board_id}"))
    Json getMenu(@PathVariable Long board_id);
}