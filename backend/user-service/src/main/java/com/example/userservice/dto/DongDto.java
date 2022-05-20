package com.example.userservice.dto;

import com.example.userservice.db.entity.Dongcode;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DongDto {


    String dong;
    Long dongcode;

    public static DongDto of(Dongcode dongcode) {
        DongDto res = new DongDto();

        res.setDongcode(dongcode.getDongcode());
        res.setDong(dongcode.getDong());

        return  res;
    }
}
