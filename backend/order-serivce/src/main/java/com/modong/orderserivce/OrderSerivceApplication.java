package com.modong.orderserivce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class OrderSerivceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderSerivceApplication.class, args);
    }

}
