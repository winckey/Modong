package com.modong.boardservice.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class DeliveryRequest {

    @NotBlank(message = "description cannot be null")
    private String description;

    @NotNull
    private Long userId;

    @NotBlank
    private String storeName;

    // 날짜 입력 포맷 생각해 봐야됨
    @NotBlank
    private String closeTime;

    @NotNull
    private Integer minPrice;

    @NotBlank
    private String pickupLocation;

    @NotBlank
    private String url;
}
