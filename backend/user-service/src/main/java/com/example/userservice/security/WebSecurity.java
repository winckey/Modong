package com.example.userservice.security;

import com.example.userservice.service.UserService;
import com.example.userservice.util.JwtTokenUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import javax.servlet.Filter;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private UserService userService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private Environment env;



    public WebSecurity(Environment env, UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.env = env;
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;

    }

    @Override// 시큐리티가 필터앞에 동작할때 comfigure 함수가 동작한다
    protected void configure(HttpSecurity http) throws Exception {// 권한부여 설정
        http.csrf().disable();
        http.authorizeRequests().antMatchers("/actuator/**").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/**", "/bus/v3/api-docs/**").permitAll();
        http.authorizeRequests().antMatchers("/**").permitAll()

//                .hasIpAddress(env.getProperty("127.0.0.0")) // <- IP 변경
                .and()
                .addFilter(getAuthenticationFilter());
//
//        http.authorizeRequests().anyRequest().denyAll();

        http.headers().frameOptions().disable();
        //h2-console접근을 위한 설정정
    }
    @Override
    public void configure(org.springframework.security.config.annotation.web.builders.WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**", "/v3/api-docs/**");
        web.ignoring().antMatchers("/swagger-ui.html/**", "/v3/api-docs/**");
        web.ignoring().antMatchers("/modong.html/**", "/v3/api-docs/**");
        web.ignoring().antMatchers("/user-service/swagger-ui/**", "/user-service/v3/api-docs/**");
        web.ignoring().antMatchers("/user-service/modong.html/**", "/user-service/v3/api-docs/**");
        web.ignoring().antMatchers("/user-service/swagger-ui.html/**", "/user-service/v3/api-docs/**");
        web.ignoring().antMatchers("/swagger.json");
        web.ignoring().antMatchers("/swagger-ui/**");
        web.ignoring().antMatchers("/swagger-resources/**");
        web.ignoring().antMatchers("/webjars/**");
    }


    @Override// 인증의 설정
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
        //userDetailsService - > userDetailsService를 상속한 서비스 파라미터로 받음
        // loaduserbyName 을 자동으로 동작시킴 인증방법 스프링시큐리티
        // @Override//
        //    protected void configure
    }

    private AuthenticationFilter getAuthenticationFilter() throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager(), userService, env);
//        authenticationFilter.setAuthenticationManager(authenticationManager());
        //WebSecurityConfigurerAdapter 안에 존재하는 authenticationManager 를 불러와 filter 에 등록
        // 시큐리티와 필터를 연결하는 작업
        return authenticationFilter;
    }


}
