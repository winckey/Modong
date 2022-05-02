package com.modong.boardservice.db.repository;

import com.modong.boardservice.db.entity.Errand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrandRepository extends JpaRepository<Errand, Long> {
    Page<Errand> findAllByDeletedIsFalse(Pageable pageable);
}
