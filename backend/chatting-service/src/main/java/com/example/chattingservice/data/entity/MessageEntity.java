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
    private Long roomId; // 방번호

    @Column(nullable = false, unique = false)
    private Long userId; // 메시지 보낸사람

    @Column(nullable = false, unique = false)
    private String message; // 메시지

}
