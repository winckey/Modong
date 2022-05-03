package com.example.userservice.db.repository;


import com.example.userservice.db.entity.Dongcode;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DongyRepository extends CrudRepository<Dongcode, Long> {

    List<Dongcode> findByGugun(String Gugun);

    Dongcode findByDongcode(Long dongcode);

    List<Dongcode> findByGugunAndCity(String gugun, String city);
}
