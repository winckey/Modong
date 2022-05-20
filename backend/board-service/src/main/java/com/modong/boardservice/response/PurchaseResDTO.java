package com.modong.boardservice.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PurchaseResDTO {

    // 글 번호
    private Long id;

    private String url;

    private String price;

    private String productName;

    private String pickupLocation;

    private LocalDateTime closeTime;

    //글 작성자 정보
    UserResDTO userInfo;

    private Boolean chatOpen;
}
