package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.repository.BoardRepository;
import com.modong.boardservice.db.repository.BoardRepositoryImpl;
import com.modong.boardservice.request.BoardReqDTO;
import com.modong.boardservice.response.BoardResDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    BoardRepositoryImpl boardRepositoryImpl;

    @Autowired
    UserClientService userClientService;

    @Override
    public Board createBoard(BoardReqDTO boardReqDTO) {

        Long dongCode = Long.valueOf(userClientService.getUser(boardReqDTO.getUserId()).getDongDto().get("dongcode"));
        Board board = Board.builder()
                .description(boardReqDTO.getDescription())
                .userId(boardReqDTO.getUserId())
                .dongCode(dongCode)
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
    public Page<BoardResDTO> boardListCalling(Pageable pageable, Long userId) {
        Long dongCode = Long.valueOf(userClientService.getUser(userId).getDongDto().get("dongcode"));

        Page<BoardResDTO> boards = boardRepositoryImpl.findAllByDeletedIsFalseAndCommentNumber(pageable,dongCode);



        return boards;
    }

    @Override
    public Page<BoardResDTO> myBoardListCalling(Pageable pageable, Long userId) {
        Page<BoardResDTO> boards = boardRepositoryImpl.findAllByDeletedIsFalseAndCommentNumberAndByUserId(pageable, userId);

        return boards;
    }
}
