package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.repository.BoardRepository;
import com.modong.boardservice.request.BoardReqDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Override
    public Board createBoard(BoardReqDTO boardReqDTO) {

        Board board = Board.builder()
                .description(boardReqDTO.getDescription())
                .userId(boardReqDTO.getUserId())
                .build();

        return (Board) boardRepository.save(board);
    }

    @Override
    public Board deleteBoard(BoardReqDTO boardReqDTO) {
        Long id = boardReqDTO.getId();

        Board board = (Board) boardRepository.getById(id);

        board.setDeleted(true);

        return (Board) boardRepository.save(board);
    }

    @Override
    public Board updateBoard(BoardReqDTO boardReqDTO) {
        Long id = boardReqDTO.getId();

        Board board = (Board) boardRepository.getById(id);

        board.setDescription(boardReqDTO.getDescription());

        return (Board) boardRepository.save(board);

    }

    @Override
    public Page<Board> boardListCalling(Pageable pageable) {
        return boardRepository.findAllByDeletedIsFalse(pageable);
    }
}