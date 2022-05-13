package com.example.userservice.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "dongcode")
public class Dongcode {
    @Id
    private Long dongcode;


    private String city;

    private String gugun;

    private String dong;

}
