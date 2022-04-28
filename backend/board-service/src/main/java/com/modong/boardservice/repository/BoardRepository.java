package com.modong.boardservice.repository;

import com.modong.boardservice.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Override
    Optional<Board> findById(Long id);


    Page<Board> findAllByDeletedIsFalse(Pageable pageable);
}
