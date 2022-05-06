package com.modong.boardservice.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
@Getter
@Setter
public class BoardResDetailDTO {


    UserResDTO userInfo;
    Page<CommentResDTO> commentList;

    public static BoardResDetailDTO of(UserResDTO userInfo, Page<CommentResDTO> commentList){
        BoardResDetailDTO boardResDetailDTO = BoardResDetailDTO.builder().userInfo(userInfo).commentList(commentList).build();



        return boardResDetailDTO;
    }
}
