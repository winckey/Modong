package com.modong.orderserivce.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
public class Prodocts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private int quantity;

    private int price;

    private String itemContent;

    @ManyToOne
    @JoinColumn(name = "orders_id")
    private Orders orders;

    public void setOrders(Orders orders) {
        this.orders = orders;
    }


    public Prodocts() {

    }


    public void changeOrder(Orders orders) {
        this.orders = orders;
    }



}
