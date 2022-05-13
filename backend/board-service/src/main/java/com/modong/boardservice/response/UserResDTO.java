package com.modong.boardservice.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.Map;


@Getter
@Setter
@Builder
public class UserResDTO {

     Long id;
     String userId;
     Long age;
     Date date_create;
     String nickname;
     String phone;
     Boolean deleted;
     Boolean banned;
     String image;
     Map<String,String> dongDto;


}
