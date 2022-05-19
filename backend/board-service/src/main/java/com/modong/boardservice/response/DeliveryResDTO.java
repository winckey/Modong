package com.modong.boardservice.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import springfox.documentation.spring.web.json.Json;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class DeliveryResDTO {

    // 글 번호
    private Long id;
    // 가게 이름
    private String storeName;
    // 종료 시간
    private LocalDateTime closeTime;
    // 배달 장소
    private String pickupLocation;
    // 요기요 url 주소
    private String url;

    private Json menus;
    //글 작성자 정보
    private UserResDTO userInfo;

    private Boolean chatOpen;
}
