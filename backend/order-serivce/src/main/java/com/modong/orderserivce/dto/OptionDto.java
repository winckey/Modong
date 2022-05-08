package com.modong.orderserivce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class OptionDto {
    @Schema(example = "곱빼기")
    private String optionContent;
    
}
