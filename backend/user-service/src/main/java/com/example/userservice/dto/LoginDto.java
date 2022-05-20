package com.example.userservice.dto;

import com.example.userservice.db.entity.Dongcode;
import lombok.Data;


@Data
public class LoginDto {


   private UserDto user;

   private String token;

   private String RefeshToken;

}
