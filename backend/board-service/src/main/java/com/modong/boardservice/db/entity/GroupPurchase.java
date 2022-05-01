package com.modong.boardservice.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class GroupPurchase extends Board{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "id", nullable = false)
    private Board board;

    @Column(nullable = false)
    private Integer minPeopleNum;

    @Column(nullable = false)
    private Integer maxPeopleNum;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private LocalDateTime closeTime;
}
