package com.modong.boardservice.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class PurchaseReqDTO {

    private String url;

    private String price;

    private String productName;

    private String pickupLocation;

    private LocalDateTime closeTime;

    private Long userId;

}
