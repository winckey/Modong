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

}
