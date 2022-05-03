package com.example.chattingservice.repository;

import com.example.chattingservice.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {


    Optional<List<UserEntity>> findByUserId(String userId);
    Optional<UserEntity> findByRoomIdAndUserId(Long roomId, String userId);

}