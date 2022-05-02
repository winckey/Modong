package com.example.userservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)// null값인것은 버리고 전송하지 않는다.
public class ResponseUser {
    private String userId;
    private String name;
    private Long id;

}