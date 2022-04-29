package com.modong.boardservice.entity;

import lombok.*;

import javax.persistence.*;

@Builder
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", referencedColumnName = "id", nullable = false)
    private Board board;


    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean deleted;


    @Column(nullable = false)
    private Long userId;

}
