package com.example.userservice.service;

import com.example.userservice.db.entity.Dongcode;
import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.db.repository.DongQueryRepositoryImpl;
import com.example.userservice.db.repository.DongyRepository;
import com.example.userservice.db.repository.RefreshTokenRedisRepository;
import com.example.userservice.db.repository.UserRepository;
import com.example.userservice.dto.UserDto;
import com.example.userservice.util.JwtTokenUtil;
import com.example.userservice.util.RefreshToken;
import com.example.userservice.vo.ReponseLogin;
import com.example.userservice.vo.RequestUser;
import com.example.userservice.vo.ResponseCity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static com.example.userservice.util.ModelMapperUtils.getModelMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class DongServiceImpl implements DongService {

    private final DongQueryRepositoryImpl dongQueryRepository;


    @Override
    public List<ResponseCity> getCitys() {


        List<String> dongcodes = dongQueryRepository.findDistinctCityAll();
        List<ResponseCity> responseCities = new ArrayList<>();
        for(String dong : dongcodes) {
            responseCities.add(new ResponseCity(dong));
        }
        return responseCities;
    }
}