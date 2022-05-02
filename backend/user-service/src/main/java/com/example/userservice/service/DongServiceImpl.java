package com.example.userservice.service;

import com.example.userservice.db.entity.Dongcode;
import com.example.userservice.db.entity.UserEntity;
import com.example.userservice.db.repository.*;
import com.example.userservice.dto.UserDto;
import com.example.userservice.util.JwtTokenUtil;
import com.example.userservice.util.RefreshToken;
import com.example.userservice.vo.ReponseLogin;
import com.example.userservice.vo.RequestCity;
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
    private final DongyRepository dongyRepository;

    @Override
    public List<ResponseCity> getCitys() {


        List<String> cityAll = dongQueryRepository.findDistinctCityAll();
        List<ResponseCity> responseCities = new ArrayList<>();
        for(String city : cityAll) {
            responseCities.add(new ResponseCity(city));
        }
        return responseCities;
    }

    @Override
    public List<ResponseCity> getGugun(RequestCity requestCity) {

        List<String> gugunByCity = dongQueryRepository.findDistinctGugunByCity(requestCity.getCity());
        List<ResponseCity> responseCities = new ArrayList<>();
        for(String gugun : gugunByCity) {
            responseCities.add(new ResponseCity(gugun));
        }
        return responseCities;
    }

    @Override
    public List<ResponseCity> getDong(RequestCity requestCity) {
        List<Dongcode> dongcodes = dongyRepository.findByGugun(requestCity.getCity());
        List<ResponseCity> responseCities = new ArrayList<>();
        for(Dongcode d : dongcodes) {
            responseCities.add(ResponseCity.of(d));
        }
        return responseCities;
    }
}