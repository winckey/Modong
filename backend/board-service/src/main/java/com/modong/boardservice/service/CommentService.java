package com.modong.boardservice.service;

import com.modong.boardservice.entity.Comment;
import com.modong.boardservice.request.CommentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    Comment createComment(CommentRequest commentRequest);
    Comment deleteComment(CommentRequest commentRequest);
    Comment updateComment(CommentRequest commentRequest);

    Page<Comment> commentListCalling(Pageable pageable);
}
