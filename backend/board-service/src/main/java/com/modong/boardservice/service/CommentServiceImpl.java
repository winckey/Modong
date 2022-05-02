package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.db.repository.BoardRepository;
import com.modong.boardservice.db.repository.CommentRepository;
import com.modong.boardservice.request.CommentReqDTO;
import com.modong.boardservice.response.CommentResDTO;
import com.modong.boardservice.response.UserResDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("commentService")
public class CommentServiceImpl implements CommentService{

    @Autowired
    UserClientService userClientService;

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
    public List<CommentResDTO> commentListCalling(Long id, Pageable pageable) {
        Page<Comment> commentList = commentRepository.findAllByDeletedIsFalseAndBoard_Id(id, pageable);

        List<CommentResDTO> res = new ArrayList<>();


        for (Comment c: commentList.getContent() ) {
            UserResDTO userResDTO = userClientService.getUser(c.getUserId());
            CommentResDTO dto = CommentResDTO.builder()
                    .id(c.getId())
                    .boardId(c.getBoard().getId())
                    .description(c.getDescription())
                    .user(userResDTO).build();


            res.add(dto);
        }


        return res;
    }
}
