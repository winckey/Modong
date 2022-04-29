package com.modong.boardservice.controller;


import com.modong.boardservice.request.CommentRequest;
import com.modong.boardservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    //댓글 등록
    @PostMapping
    public ResponseEntity commentCreate(@RequestBody CommentRequest commentRequest) {


        commentService.createComment(commentRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping
    public ResponseEntity commentDelete(@RequestBody CommentRequest commentRequest ) {

        commentService.deleteComment(commentRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 댓글 수정
    @PutMapping
    public ResponseEntity commentUpdate(@RequestBody CommentRequest commentRequest ) {

        commentService.updateComment(commentRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }


    //상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity boardRead(@PathVariable String boardId) {


        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
