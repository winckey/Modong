package com.modong.boardservice.db.repository;


import com.modong.boardservice.db.entity.Purchase;
import com.modong.boardservice.db.entity.Purchase;
import com.modong.boardservice.db.entity.QPurchase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class PurchaseRepositoryImpl {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QPurchase qPurchase = QPurchase.purchase.purchase;

    public Page<Purchase> findAllByTimeLimit(Pageable pageable){


        List<Purchase> purchases = jpaQueryFactory.selectFrom(qPurchase).where(qPurchase.closeTime.gt(LocalDateTime.now()))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = jpaQueryFactory.select(qPurchase.id.count()).from(qPurchase).where(qPurchase.closeTime.gt(LocalDateTime.now())).fetchOne();


        return new PageImpl<>(purchases, pageable, total);
    }


    public Page<Purchase> findAllByTimeLimitAndByUserId(Pageable pageable, Long userId) {
        List<Purchase> deliveries = jpaQueryFactory.selectFrom(qPurchase).where(qPurchase.userId.eq(userId))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = jpaQueryFactory.select(qPurchase.id.count()).from(qPurchase).where(qPurchase.closeTime.gt(LocalDateTime.now())).fetchOne();


        return new PageImpl<>(deliveries, pageable, total);

    }
}
