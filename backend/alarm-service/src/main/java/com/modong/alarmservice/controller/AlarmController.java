package com.modong.alarmservice.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.modong.alarmservice.dto.LoginRequestDTO;
import com.modong.alarmservice.dto.MessageRequestDTO;
import com.modong.alarmservice.service.FirebaseCloudMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequestMapping("/alarm-service")
@RestController
public class AlarmController {

    @Autowired
    FirebaseCloudMessageService firebaseCloudMessageService;

    @PostMapping
    public ResponseEntity pushMessage(@RequestBody MessageRequestDTO requestDTO) throws IOException {
        System.out.println(requestDTO.getTargetToken() + " "
                +requestDTO.getTitle() + " " + requestDTO.getBody());

        firebaseCloudMessageService.sendMessageTo(
                requestDTO.getTargetToken(),
                requestDTO.getTitle(),
                requestDTO.getBody());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity registerToken(@RequestBody LoginRequestDTO userInfo) throws FirebaseAuthException {

        System.out.println(firebaseCloudMessageService.makeCustomToken(userInfo.getUserId()));

        return ResponseEntity.ok().build();
    }

}