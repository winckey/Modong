package com.modong.boardservice.service;


import com.modong.boardservice.client.UserClient;
import com.modong.boardservice.response.UserResDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserClientService {

    @Autowired
    UserClient userClient;


    public UserResDTO getUser(Long userId) {
        UserResDTO user = userClient.getUser(userId);

        return user;
    }
}
