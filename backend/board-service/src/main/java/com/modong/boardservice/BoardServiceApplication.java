package com.modong.boardservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableFeignClients
@EnableJpaAuditing
@SpringBootApplication
public class BoardServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoardServiceApplication.class, args);
    }

}
