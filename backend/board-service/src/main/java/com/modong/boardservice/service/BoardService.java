package com.modong.boardservice.service;

import com.modong.boardservice.entity.Board;
import com.modong.boardservice.request.BoardReqDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {

//  게시글 등록
    Board createBoard(BoardReqDTO boardReqDTO);

//  게시글 삭제
    Board deleteBoard(BoardReqDTO boardReqDTO);

//  게시글 수정
    Board updateBoard(BoardReqDTO boardReqDTO);

//  게시글 목록 불러오기
    Page<Board> boardListCalling(Pageable pageable);


}
