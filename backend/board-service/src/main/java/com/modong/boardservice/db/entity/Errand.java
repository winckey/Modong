package com.modong.boardservice.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("errand")
@Entity
public class Errand extends Board{

    @Column(nullable = false)
    private String category;

    @Builder(builderMethodName = "ErrandBuilder")
    public Errand(String description, Long userId , String category){
        super(description,userId);
        this.category = category;

    }
}
