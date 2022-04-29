package com.modong.boardservice.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    
    //댓글 번호
    private  Long id;
    
    //글 번호
    private Long boardId;

    // 글 내용
    private String description;

    // 글 작성자 id
    private Long userId;

}
