package com.example.userservice.vo;

import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.dto.UserDto;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static com.example.userservice.util.ModelMapperUtils.getModelMapper;

@Data
public class ReponseLogin {

    private UserDto userDto;
    private String jwtToken;
    private String jwtRefreshToken;

    @Builder
    public ReponseLogin(String jwtToken, String jwtRefreshToken, UserEntity userEntity) {
        this.jwtToken = jwtToken;
        this.jwtRefreshToken = jwtRefreshToken;
        setUserDto(userEntity);
    }

    public void setUserDto(UserEntity userEntity) {
        this.userDto = getModelMapper().map(userEntity, UserDto.class);
    }

    public static ReponseLogin of(String accessToken, String refreshToken, UserEntity userEntity) {
        return ReponseLogin.builder()
                .jwtToken(accessToken)
                .jwtRefreshToken(refreshToken)
                .userEntity(userEntity)
                .build();
    }
}
