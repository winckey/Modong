package com.example.userservice.controller;


import com.example.userservice.db.repository.UserRepository;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.*;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@Slf4j
@Validated
@Api(tags = "회원 관리")
@RestController
@RequestMapping("/user-service")
@RequiredArgsConstructor
public class UserController {

    private final Environment env;
    private final UserService userService;
    private final UserRepository userRepository;


    @Autowired
    private Greeting greeting;



    @GetMapping("/health_check")
    @Timed(value="user.status", longTask = true)
    public String status() {

        return String.format("It's Working in User Service"
                + ", port(local.server.port)=" + env.getProperty("local.server.port")
                + ", port(server.port)=" + env.getProperty("server.port")
                + ", gateway ip=" + env.getProperty("gateway.ip")
                + ", message=" + env.getProperty("greeting.message")
                + ", token secret=" + env.getProperty("token.secret")
                + ", token expiration time=" + env.getProperty("token.expiration_time")
                + ", token re_expiration time=" + env.getProperty("token.re_expiration_time"));
    }

    @GetMapping("/welcome")
    @Operation(hidden = true)
    @Timed(value="user.welcome", longTask = true)
    public String welcome() {
        System.out.println("welcome");
        return greeting.getMessage();
    }

    @PostMapping("/logout")
    @Operation()
    public String logout() {
        System.out.println("welcome");
        return greeting.getMessage();
    }

    @PostMapping("/register")
    @Operation(summary = "회원 가입", description  = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    public ResponseEntity<ResponseUser> createUser(@RequestBody ReqUserRegister user) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ResponseUser responseUser = mapper.map(userService.createUser(user), ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    
    @GetMapping("users/{userId}")
    @Operation(summary = "정보 조회", description  = "유저id로 정보 조회")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Long userId) {
        UserDto userDto = userService.getUserByUserId(userId);



        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @PutMapping("/users")
    @Operation(summary = "정보 수정", description  = "유저id로 정보 수정")
    public ResponseEntity<UserDto> modifyUser(@Valid @RequestBody ReqUserModify reqUserModify) {


        System.out.println(reqUserModify);

        UserDto userDto = userService.modifyUser(reqUserModify.getId() , reqUserModify);

        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @DeleteMapping("/users")
    @Operation(summary = "유저 임시 탈퇴", description  = "유저 임시 탈퇴")
    public ResponseEntity deleteUser(@Valid @RequestBody Long id) {
        userService.deleteUser(id);

        return new ResponseEntity(HttpStatus.OK);
    }


    @PostMapping("/reissue")
    public ResponseEntity<ReponseLogin> reissue(@RequestHeader("RefreshToken") String refreshToken, @Valid @RequestBody ReqUserRegister reqUserRegister) {

        ReponseLogin reponseLogin = userService.reissue(refreshToken , reqUserRegister);

        return ResponseEntity.status(HttpStatus.OK).body(reponseLogin);
    }

    @PostMapping("/images")
    public String upload(@RequestParam("images") MultipartFile multipartFile) throws IOException {


        return "test";
    }
}
