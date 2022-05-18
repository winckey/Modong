package com.modong.boardservice.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Purchase{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String price;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private LocalDateTime closeTime;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long dongCode;
}
