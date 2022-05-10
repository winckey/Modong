package com.modong.orderserivce.dto;

import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Option;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OptionDto {
    @Schema(example = "곱빼기")
    private String optionContent;

    public static List<OptionDto> of(List<Option> optionList) {

        ModelMapper modelMapper = new ModelMapper();

        List<OptionDto> optionDtoList = new ArrayList<>();

        for (Option option: optionList ){
            optionDtoList.add(modelMapper.map(option , OptionDto.class));
        }


        return optionDtoList;


    }
}
