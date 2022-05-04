package com.modong.orderserivce.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Entity
@Table(name = "dongcode")
public class Order {
    @Id
    private Long dongcode;


    private String city;

    private String gugun;

    private String dong;

}
