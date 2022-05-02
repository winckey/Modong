package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.request.CommentReqDTO;
import com.modong.boardservice.response.CommentResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentService {

    Comment createComment(CommentReqDTO commentReqDTO);
    Comment deleteComment(CommentReqDTO commentReqDTO);
    Comment updateComment(CommentReqDTO commentReqDTO);

    List<CommentResDTO> commentListCalling(Long id, Pageable pageable);
}
