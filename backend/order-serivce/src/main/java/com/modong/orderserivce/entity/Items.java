package com.modong.orderserivce.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@AllArgsConstructor
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders", referencedColumnName = "id")
    private Order orders;

    @OneToMany(mappedBy = "items", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    @Builder.Default
    private List<Option> optionList = new ArrayList<>();

    private int quantity;

    private int price;

    private String itemContent;


    public Items() {

    }


    public void changeOrder(Order order) {

        order.getItemsList().add(this);
    }



}
