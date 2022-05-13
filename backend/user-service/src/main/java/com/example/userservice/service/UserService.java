package com.example.userservice.service;

import com.example.userservice.dto.UserDto;
import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.util.RefreshToken;
import com.example.userservice.vo.ReponseLogin;
import com.example.userservice.vo.ReqUserModify;
import com.example.userservice.vo.ReqUserRegister;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;


public interface UserService extends UserDetailsService {
    UserDto createUser(ReqUserRegister userDto);



    UserDto getUserByUserId(Long userId);

    Iterable<UserEntity> getUserByAll();

    UserDto getUserDetailsByEmail(String userName);

    RefreshToken saveRefreshToken(String userName);

    ReponseLogin reissue(String refreshToken, ReqUserRegister reqUserRegister);

    UserDto modifyUser(Long userId , ReqUserModify reqUserModify);

    void deleteUser(Long id);

    UserDto profileSave(MultipartFile multipartFile, Long userId);
}
