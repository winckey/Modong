package com.modong.orderserivce.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Table(name = "orders")
@Builder
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long boardId;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;



    private Long userId;
    @OneToMany(mappedBy = "orders", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    @Builder.Default
    private List<Items> itemsList = new ArrayList<>();

    public Order() {

    }


}
