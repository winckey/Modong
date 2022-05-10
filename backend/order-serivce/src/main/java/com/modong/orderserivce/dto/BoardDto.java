package com.modong.orderserivce.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardDto {

    private Long boardId;

    private String url;

    private String price;

    private String pickupLocation;

    private LocalDateTime closeTime;

}
