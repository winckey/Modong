package com.modong.orderserivce.entity;

import com.modong.orderserivce.dto.ItemDto;
import com.modong.orderserivce.dto.ReqOrderDto;
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
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders", referencedColumnName = "id")
    private Order orders;

    @OneToMany(mappedBy = "item", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    @Builder.Default
    private List<Option> optionList = new ArrayList<>();

    private int quantity;

    private int price;

    private String itemContent;


    public Item() {

    }


    public void changeOrder(Order order) {

        order.getItemList().add(this);
    }



}
