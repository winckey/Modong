package com.example.chattingservice.data.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "chat_room")
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 채팅방 이름
//    @Column(nullable = false, unique = false, length = 50) ^^
    private String name;
    private String type; // 구매, 배달, 심부름, ...
}
