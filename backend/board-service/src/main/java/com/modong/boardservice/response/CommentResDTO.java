package com.modong.boardservice.response;


import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.service.UserClientService;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
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
    UserResDTO user;


}
