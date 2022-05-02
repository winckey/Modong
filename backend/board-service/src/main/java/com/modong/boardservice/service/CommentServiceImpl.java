package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.db.repository.BoardRepository;
import com.modong.boardservice.db.repository.CommentRepository;
import com.modong.boardservice.request.CommentReqDTO;
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
    public Comment createComment(CommentReqDTO commentReqDTO) {
        Board board = (Board) boardRepository.getById(commentReqDTO.getBoardId());

        Comment comment = Comment.builder()
                .description(commentReqDTO.getDescription())
                .userId(commentReqDTO.getUserId())
                .board(board)
                .build();


        return commentRepository.save(comment);
    }

    @Override
    public Comment deleteComment(CommentReqDTO commentReqDTO) {
        Long id = commentReqDTO.getId();

        Comment comment = commentRepository.getById(id);

        comment.setDeleted(true);
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(CommentReqDTO commentReqDTO) {
        Long id = commentReqDTO.getId();

        Comment comment = commentRepository.getById(id);

        comment.setDescription(commentReqDTO.getDescription());

        return commentRepository.save(comment);
    }

    @Override
    public Page<Comment> commentListCalling(Long id, Pageable pageable) {
        return commentRepository.findAllByDeletedIsFalseAndBoard_Id(id, pageable);
    }
}
