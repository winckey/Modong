package com.modong.boardservice.repository;

import com.modong.boardservice.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long > {


}
