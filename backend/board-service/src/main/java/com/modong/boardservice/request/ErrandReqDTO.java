package com.modong.boardservice.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrandReqDTO {

    //글 번호
    private Long id;

    // 심부름 종류
    private String category;
    
    // 글 내용
    private String description;

    // 글 작성자 id
    private Long userId;

}
