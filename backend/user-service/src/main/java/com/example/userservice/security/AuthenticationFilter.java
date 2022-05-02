package com.example.userservice.security;

import com.example.userservice.dto.LoginDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.UserService;
import com.example.userservice.util.JwtTokenUtil;
import com.example.userservice.vo.RequestLogin;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private UserService userService;
    private Environment env;


    public AuthenticationFilter(AuthenticationManager authenticationManager,
                                UserService userService,
                                Environment env ) {
        super.setAuthenticationManager(authenticationManager);
        this.userService = userService;
        this.env = env;

    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            RequestLogin creds = new ObjectMapper().readValue(request.getInputStream(), RequestLogin.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(/// authenticate 에 넣기 위한 변환 과정UsernamePasswordAuthenticationToken
                            creds.getUserId(),
                            creds.getUserPw(),
                            new ArrayList<>()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override// 로그인 성공시 반환처리 토큰생성 등을 담당함.(attemptAuthentication 다음에 동작) 이거 동작후 필터 종료
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        JwtTokenUtil jwtTokenUtil   = new JwtTokenUtil(env);
        String userName = ((User)authResult.getPrincipal()).getUsername();

        UserDto userDetails = userService.getUserDetailsByEmail(userName);

        String jwtToken = jwtTokenUtil.generateAccessToken(userDetails.getUserId());
        String refreshToken = userService.saveRefreshToken(userName).getRefreshToken();
        // 리프레쉬 토큰 레디스에 저장하고 반환
        
        System.out.println("token : " + env.getProperty("token.expiration_time"));
        
        response.addHeader("jwtToken", jwtToken);
        response.addHeader("refreshToken", refreshToken);
        response.addHeader("userId", userDetails.getUserId());


        LoginDto loginDto = new LoginDto();

        loginDto.setUserDto(userDetails);
        loginDto.setToken(jwtToken);
        loginDto.setRefeshToken(refreshToken);

        String json = new Gson().toJson(loginDto);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

//        RefreshToken refreshToken = saveRefreshToken(username);
//        리프레쉬 토큰 발행 추가
    }
}
