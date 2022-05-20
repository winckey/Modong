package com.modong.boardservice.db.repository;

import com.modong.boardservice.db.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
