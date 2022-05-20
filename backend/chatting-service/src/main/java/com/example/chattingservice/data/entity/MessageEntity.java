package com.example.chattingservice.data.entity;

import lombok.*;
import javax.persistence.*;

@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message")
public class MessageEntity extends AuditEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = false)
    private String message; // 메시지

    @ManyToOne
    @JoinColumn(name = "roomId")
    private RoomEntity room;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
}
