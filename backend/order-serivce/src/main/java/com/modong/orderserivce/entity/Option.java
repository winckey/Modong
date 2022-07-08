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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item", referencedColumnName = "id")
    private Items items;

    private String optionContent;

    public Option() {

    }

    public void changeItem(Items items) {

        items.getOptionList().add(this);
    }
}
