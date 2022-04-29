package com.example.userservice.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String userId;
    @Column(nullable = false, unique = true)
    private String userPwEn;

    private int age;

    private LocalDateTime date_create;

    private LocalDateTime date_withdraw;

    private String name;

    private String nickname;

    private String phone;

    private boolean deleted;

    private boolean banned;

    private String image;

    public UserEntity() {

    }
}
