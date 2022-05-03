package com.modong.boardservice.controller;


import com.modong.boardservice.request.CommentReqDTO;
import com.modong.boardservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board-service/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    //댓글 등록
    @PostMapping
    public ResponseEntity commentCreate(@RequestBody CommentReqDTO commentReqDTO) {


        commentService.createComment(commentReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping
    public ResponseEntity commentDelete(@RequestBody CommentReqDTO commentReqDTO ) {

        commentService.deleteComment(commentReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 댓글 수정
    @PutMapping
    public ResponseEntity commentUpdate(@RequestBody CommentReqDTO commentReqDTO ) {

        commentService.updateComment(commentReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

}
