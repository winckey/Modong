package com.modong.boardservice.service;

import com.modong.boardservice.entity.Board;
import com.modong.boardservice.repository.BoardRepository;
import com.modong.boardservice.request.BoardRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Override
    public Board createBoard(BoardRequest boardRequest) {

        Board board = Board.builder()
                .description(boardRequest.getDescription())
                .userId(boardRequest.getUserId())
                .build();

        return boardRepository.save(board);
    }

    @Override
    public Board deleteBoard(BoardRequest boardRequest) {
        Long id = boardRequest.getId();

        Board board = boardRepository.getById(id);

        board.setDeleted(true);

        return boardRepository.save(board);
    }

    @Override
    public Board updateBoard(BoardRequest boardRequest) {
        Long id = boardRequest.getId();

        Board board = boardRepository.getById(id);

        board.setDescription(boardRequest.getDescription());

        return boardRepository.save(board);

    }

    @Override
    public Page<Board> boardListCalling(Pageable pageable) {


        Page<Board> board =  boardRepository.findAllByDeletedIsFalse(pageable);

        return board;
    }
}
