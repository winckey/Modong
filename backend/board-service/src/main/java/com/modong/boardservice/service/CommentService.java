package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.request.CommentReqDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    Comment createComment(CommentReqDTO commentReqDTO);
    Comment deleteComment(CommentReqDTO commentReqDTO);
    Comment updateComment(CommentReqDTO commentReqDTO);

    Page<Comment> commentListCalling(Long id, Pageable pageable);
}
