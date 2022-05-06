package com.modong.boardservice.controller;


import com.modong.boardservice.db.entity.Comment;
import com.modong.boardservice.request.BoardReqDTO;
import com.modong.boardservice.response.BoardResDTO;
import com.modong.boardservice.response.BoardResDetailDTO;
import com.modong.boardservice.response.CommentResDTO;
import com.modong.boardservice.response.UserResDTO;
import com.modong.boardservice.service.BoardService;
import com.modong.boardservice.service.CommentService;
import com.modong.boardservice.service.UserClientService;
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
@RequestMapping("/board-service")
@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    @Autowired
    CommentService commentService;

    @Autowired
    UserClientService userClientService;

    //글 등록
    @PostMapping
    public ResponseEntity boardCreate(@RequestBody BoardReqDTO boardReqDTO) {


        boardService.createBoard(boardReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //글 삭제
    @DeleteMapping
    public ResponseEntity boardDelete(@RequestBody BoardReqDTO boardReqDTO) {


        boardService.deleteBoard(boardReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    // 글 수정
    @PutMapping
    public ResponseEntity boardUpdate(@RequestBody BoardReqDTO boardReqDTO) {

        boardService.updateBoard(boardReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //목록 조회(Pagination, 10개)
    @GetMapping
    public ResponseEntity boardList(@PageableDefault(page = 0, size = 2) Pageable pageable) {


        return new ResponseEntity<>(boardService.boardListCalling(pageable), HttpStatus.OK);
    }

    //상세 조회
    @GetMapping("/{boardId}/{userId}")
    public ResponseEntity boardRead(@PathVariable("boardId") Long boardId, @PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable("userId") Long userId) {

        Page<CommentResDTO> commentResDTO = commentService.commentListCalling(boardId, pageable);
        UserResDTO userInfo = userClientService.getUser(userId);
        return new ResponseEntity<>(BoardResDetailDTO.of(userInfo,commentResDTO), HttpStatus.OK);
    }

    //자신 글 조회
    @GetMapping("/{userId}")
    public ResponseEntity myBoardRead(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable("userId") Long userId) {

        Page<CommentResDTO> commentResDTO = commentService.commentListCalling(userId, pageable);
        UserResDTO userInfo = userClientService.getUser(userId);
        return new ResponseEntity<>(BoardResDetailDTO.of(userInfo,commentResDTO), HttpStatus.OK);
    }

}
