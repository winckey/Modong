package com.modong.boardservice.service;

import com.modong.boardservice.entity.Board;
import com.modong.boardservice.entity.Comment;
import com.modong.boardservice.repository.BoardRepository;
import com.modong.boardservice.repository.CommentRepository;
import com.modong.boardservice.request.CommentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service("commentService")
public class CommentServiceImpl implements CommentService{

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment createComment(CommentRequest commentRequest) {
        Board board = boardRepository.getById(commentRequest.getBoardId());

        Comment comment = Comment.builder()
                .description(commentRequest.getDescription())
                .userId(commentRequest.getUserId())
                .board(board)
                .build();


        return commentRepository.save(comment);
    }

    @Override
    public Comment deleteComment(CommentRequest commentRequest) {
        Long id = commentRequest.getId();

        Comment comment = commentRepository.getById(id);

        comment.setDeleted(true);
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(CommentRequest commentRequest) {
        Long id = commentRequest.getId();

        Comment comment = commentRepository.getById(id);

        comment.setDescription(commentRequest.getDescription());

        return commentRepository.save(comment);
    }

    @Override
    public Page<Comment> commentListCalling(Pageable pageable) {
        return commentRepository.findAllByDeletedIsFalse(pageable);
    }
}
