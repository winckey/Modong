package com.example.userservice.service;


import com.example.userservice.vo.RequestCity;
import com.example.userservice.vo.ResponseCity;

import java.util.List;

public interface DongService {

    List<ResponseCity> getCitys();


    List<ResponseCity> getGugun(RequestCity requestCity);

    List<ResponseCity> getDong(RequestCity requestCity);
}
