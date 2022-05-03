package com.modong.boardservice.db.repository;


import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.entity.QBoard;
import com.modong.boardservice.db.entity.QComment;
import com.modong.boardservice.response.BoardResDTO;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BoardRepositoryImpl {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QComment qComment = QComment.comment;
    QBoard qBoard = QBoard.board;

    public Page<BoardResDTO> findAllByDeletedIsFalseAndCommentNumber(Pageable pageable){

        List<Board> boards = jpaQueryFactory.selectFrom(qBoard).where(qBoard.deleted.eq(false))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = jpaQueryFactory.select(qBoard.id.count()).from(qBoard).where(qBoard.deleted.eq(false)).fetchOne();

        List<BoardResDTO> result = new ArrayList<>();

        for(Board b : boards){
            Long comment = jpaQueryFactory
                    .select(qComment.count())
                    .from(qComment)
                    .where(qComment.board.id.eq(b.getId())).fetchOne();

            BoardResDTO boardResDTO = BoardResDTO.builder()
                    .id(b.getId())
                    .commentNumber(comment)
                    .modifiedDate(b.getDateLastUpdated())
                    .createdDate(b.getDateCreated())
                    .description(b.getDescription())
                    .userId(b.getUserId())
                    .build();

            result.add(boardResDTO);
        }



        return new PageImpl<>(result, pageable, total);
    }






}
