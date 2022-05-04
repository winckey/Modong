package com.modong.boardservice.request;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
public class DeliveryReqDTO {
    //글 번호
    private Long boardId;

    // 글 내용
    private String description;

    // 글 작성자 id
    private Long userId;

    // 배달글 id
    private Long id;

    // 가게 이름
    private String storeName;

    // 종료 시간
    private LocalDateTime closeTime;

    // 최저 금액
    private Integer minPrice;

    // 배달 장소
    private String pickupLocation;

    // 가게 url 주소
    private String url;
}
