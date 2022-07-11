package com.modong.orderserivce.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "options")
@Builder
@AllArgsConstructor
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String optionContent;


    @ManyToOne
    @JoinColumn(name = "prodocts_id")
    private Prodocts prodocts;

    public void setProdocts(Prodocts prodocts) {
        this.prodocts = prodocts;
    }

    public Option() {

    }


}
