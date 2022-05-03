package com.example.userservice.service;

import com.example.userservice.db.entity.Dongcode;
import com.example.userservice.db.repository.*;
import com.example.userservice.vo.ResponseCity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public List<ResponseCity> getGugun(String city) {

        List<String> gugunByCity = dongQueryRepository.findDistinctGugunByCity(city);
        List<ResponseCity> responseCities = new ArrayList<>();
        for(String gugun : gugunByCity) {
            responseCities.add(new ResponseCity(gugun));
        }
        return responseCities;
    }

    @Override
    public List<ResponseCity> getDong(String gugun) {
        List<Dongcode> dongcodes = dongyRepository.findByGugun(gugun);
        List<ResponseCity> responseCities = new ArrayList<>();
        for(Dongcode d : dongcodes) {
            responseCities.add(ResponseCity.of(d));
        }
        return responseCities;
    }
}