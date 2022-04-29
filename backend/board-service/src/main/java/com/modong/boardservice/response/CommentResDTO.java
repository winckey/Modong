package com.modong.boardservice.response;


import com.modong.boardservice.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class CommentResDTO {

    private Long id;
    private Long boardId;
    private String description;
    private boolean deleted;
    private Long userId;


    public static List<CommentResDTO> of(Page<Comment> commentList){
        List<CommentResDTO> res = new ArrayList<>();


        for (Comment c: commentList.getContent() ) {
            CommentResDTO dto = CommentResDTO.builder()
                    .id(c.getId())
                    .boardId(c.getBoard().getId())
                    .description(c.getDescription())
                    .userId(c.getUserId()).build();


            res.add(dto);
        }
        return res;
    }
}
