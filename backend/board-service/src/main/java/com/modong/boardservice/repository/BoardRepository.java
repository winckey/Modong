package com.modong.boardservice.repository;

import com.modong.boardservice.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
