package com.modong.boardservice.db.repository;

import com.modong.boardservice.db.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByDeletedIsFalse(Pageable pageable);
}
