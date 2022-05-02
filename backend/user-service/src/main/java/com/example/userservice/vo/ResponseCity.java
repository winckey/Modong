package com.example.userservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)// null값인것은 버리고 전송하지 않는다.
public class ResponseCity {
    private Long dongcode;
    private String city;


    public ResponseCity(String city) {
        this.city = city;
    }
}
