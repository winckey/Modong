package com.modong.boardservice.db.repository;


import com.modong.boardservice.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DeliveryRepositoryImpl {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QDelivery qDelivery = QDelivery.delivery;

    public Page<Delivery> findAllByTimeLimit(Pageable pageable, Long dongCode){


        List<Delivery> deliveries = jpaQueryFactory.selectFrom(qDelivery).where(qDelivery.closeTime.gt(LocalDateTime.now()).and(qDelivery.dongCode.eq(dongCode)))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = jpaQueryFactory.select(qDelivery.id.count()).from(qDelivery).where(qDelivery.closeTime.gt(LocalDateTime.now())).fetchOne();


        return new PageImpl<>(deliveries, pageable, total);
    }


    public Page<Delivery> findAllByTimeLimitAndByUserId(Pageable pageable, Long userId) {
        List<Delivery> deliveries = jpaQueryFactory.selectFrom(qDelivery).where(qDelivery.userId.eq(userId))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = jpaQueryFactory.select(qDelivery.id.count()).from(qDelivery).where(qDelivery.closeTime.gt(LocalDateTime.now())).fetchOne();


        return new PageImpl<>(deliveries, pageable, total);

    }
}
