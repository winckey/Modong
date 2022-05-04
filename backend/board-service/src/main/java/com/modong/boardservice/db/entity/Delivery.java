package com.modong.boardservice.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Delivery extends Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Builder(builderMethodName = "DeliveryBuilder")
    public Delivery(String description, Long userId, String storeName, LocalDateTime closeTime, Integer minPrice, String pickupLocation, String url) {
        super(description, userId);
        this.storeName = storeName;
        this.closeTime = closeTime;
        this.minPrice = minPrice;
        this.pickupLocation = pickupLocation;
        this.url = url;

    }
}
