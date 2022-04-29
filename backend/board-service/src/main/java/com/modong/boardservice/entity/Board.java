package com.modong.boardservice.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
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

    @PrePersist
    public void prePersist() {
        this.deleted = this.deleted != null && this.deleted;
    }
}
