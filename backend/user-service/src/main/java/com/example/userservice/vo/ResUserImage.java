package com.example.userservice.vo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ResUserImage {

    private MultipartFile multipartFile ;

    private Long userId;
}
