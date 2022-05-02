package com.example.userservice.db.entity;

import com.example.userservice.vo.RequestUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "dongcode")
public class Dongcode {
    @Id
    private Long dongcode;


    private String city;

    private String gugun;

    private String dong;

}
