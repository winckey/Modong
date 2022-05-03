package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.request.BoardReqDTO;
import com.modong.boardservice.response.BoardResDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {

//  게시글 등록
    Board createBoard(BoardReqDTO boardReqDTO);

//  게시글 삭제
    Board deleteBoard(BoardReqDTO boardReqDTO);

//  게시글 수정
    Board updateBoard(BoardReqDTO boardReqDTO);

//  게시글 목록 불러오기
    Page<BoardResDTO> boardListCalling(Pageable pageable);


}
