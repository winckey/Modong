package com.modong.orderserivce.repository;


import com.modong.orderserivce.entity.Option;
import com.modong.orderserivce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByUserId(Long userId);

    List<Order> findByBoardId(Long boadId);
}