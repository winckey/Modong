package com.modong.boardservice.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class GroupDelivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "id", nullable = false)
    private Board board;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private LocalDateTime closeTime;

    @Column(nullable = false)
    private Integer minPrice;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private String url;
}
