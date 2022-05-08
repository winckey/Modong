package com.modong.orderserivce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class ItemDto {
    @Schema(example = "짜장면")
    private String itemContent;

    private List<OptionDto> options;

}
