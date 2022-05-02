package com.example.userservice.db.repository;

import com.example.userservice.db.entity.QDongcode;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public class DongQueryRepositoryImpl implements DongQueryRepository {


    private final JPAQueryFactory jpaQueryFactory;
    private QDongcode qDongcode = new QDongcode("nft");

    public DongQueryRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }



    @Override
    public List<String> findDistinctCityAll() {

        return jpaQueryFactory
                .select(qDongcode.city).distinct()
                .from(qDongcode)
                .fetch();
    }

}
