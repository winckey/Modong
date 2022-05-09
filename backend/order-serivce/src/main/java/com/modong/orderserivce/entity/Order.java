package com.modong.orderserivce.entity;

import com.modong.orderserivce.dto.ReqOrderDto;
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

    private OrderType orderType;

    private Long userId;
    @OneToMany(mappedBy = "orders", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    @Builder.Default
    private List<Item> itemList = new ArrayList<>();

    public Order() {

    }


}
