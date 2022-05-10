package com.example.chattingservice.data.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    // 채팅방 이름
//    @Column(nullable = false, unique = false, length = 50) ^^
    private Long roomId; // 방번호
    private Long userId; // 메시지 보낸사람
    private String message; // 메시지

}
