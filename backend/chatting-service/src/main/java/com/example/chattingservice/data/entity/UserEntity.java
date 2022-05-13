package com.example.chattingservice.data.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "chat_user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column(nullable = false, unique = false, length = 50) ^^
    // String타입의 userId입니다. 프론트에 전달해줘야하는 값이기 때문에 Long타입은 사용하지 않습니다.
    private Long roomId;
    private Long userId;
    private String userName;
}
