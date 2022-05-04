package com.modong.boardservice.db.repository;

import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.entity.Delivery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Page<Delivery>  findAllByDeletedIsFalse(Pageable pageable);

}
