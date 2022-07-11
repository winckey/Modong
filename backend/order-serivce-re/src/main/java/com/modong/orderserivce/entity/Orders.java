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
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long boardId;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;


//    @OneToMany
//    @JoinColumn(name = "id")
//    private List<Prodocts> prodoctsList = new ArrayList<>();



    private Long userId;


    public Orders() {

    }


}
