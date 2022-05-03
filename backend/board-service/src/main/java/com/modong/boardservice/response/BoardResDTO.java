package com.modong.boardservice.response;


import com.modong.boardservice.db.entity.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class BoardResDTO {

    private Long id;
    private String description;
    private Long userId;
    private Long commentNumber;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    public static List<BoardResDTO> of(Page<Board> boardList){
        List<BoardResDTO> res = new ArrayList<>();



        for (Board b: boardList.getContent() ) {

            BoardResDTO dto = BoardResDTO.builder()
                    .createdDate(b.getDateCreated())
                    .modifiedDate(b.getDateLastUpdated())
                    .id(b.getId())
                    .description(b.getDescription())
                    .userId(b.getUserId()).build();


            res.add(dto);
        }
        return res;
    }
}
