package com.modong.boardservice.controller;


import com.modong.boardservice.entity.Comment;
import com.modong.boardservice.request.BoardRequest;
import com.modong.boardservice.service.BoardService;
import com.modong.boardservice.service.CommentService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(value = "게시판 api", tags = {"board"})
@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    CommentService commentService;

    //글 등록
    @PostMapping
    public ResponseEntity boardCreate(@RequestBody BoardRequest boardRequest) {


        boardService.createBoard(boardRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity boardDelete(@RequestBody BoardRequest boardRequest) {


        boardService.deleteBoard(boardRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 글 수정
    @PutMapping
    public ResponseEntity boardUpdate(@RequestBody BoardRequest boardRequest) {

        boardService.updateBoard(boardRequest);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping
    public ResponseEntity boardList(@PageableDefault(page = 0, size = 10) Pageable pageable) {


        return new ResponseEntity<>(boardService.boardListCalling(pageable), HttpStatus.OK);
    }

    //상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity boardRead(@PathVariable Long boardId, @PageableDefault(page = 0, size = 10) Pageable pageable) {

        List<Comment> commentList =  commentService.commentListCalling(boardId, pageable).getContent();
        return new ResponseEntity<>(commentList, HttpStatus.OK);
    }

}
