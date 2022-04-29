package com.example.userservice.service;

import com.example.userservice.dto.UserDto;
import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.util.RefreshToken;
import com.example.userservice.vo.ReponseLogin;
import com.example.userservice.vo.RequestUser;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService extends UserDetailsService {
    UserDto createUser(RequestUser userDto);



    UserDto getUserByUserId(Long userId);

    Iterable<UserEntity> getUserByAll();

    UserDto getUserDetailsByEmail(String userName);

    RefreshToken saveRefreshToken(String userName);

    ReponseLogin reissue(String refreshToken, RequestUser requestUser);

    UserDto modifyUser(Long userId , RequestUser requestUser);
}
