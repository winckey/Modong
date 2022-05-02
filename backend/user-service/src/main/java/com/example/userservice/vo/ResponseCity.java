package com.example.userservice.vo;

import com.example.userservice.db.entity.Dongcode;
import com.example.userservice.db.entity.QDongcode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)// null값인것은 버리고 전송하지 않는다.
public class ResponseCity {


    private Long dongcode;
    private String city;


    public ResponseCity(String city) {
        this.city = city;
    }

    public ResponseCity() {

    }

    public static ResponseCity of(Dongcode d) {
        ResponseCity res = new ResponseCity();

        res.setDongcode(d.getDongcode());
        res.setCity(d.getDong());


        return res;
    }
}
