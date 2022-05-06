package com.modong.boardservice.db.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@DiscriminatorValue("board")
@Entity
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean deleted;

    @Column(nullable = false)
    private Long userId;

    public Board(String description, Long userId) {
        this.description = description;
        this.userId = userId;
        this.deleted = false;
    }


    @PrePersist
    public void prePersist() {
        this.deleted = this.deleted != null && this.deleted;
    }
}
