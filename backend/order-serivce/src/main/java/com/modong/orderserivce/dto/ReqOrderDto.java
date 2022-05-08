package com.modong.orderserivce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class ReqOrderDto {

    @Schema(example = "1")
    private Long boardId;

    @Schema(example = "1")
    private Long userId;



    private List<ItemDto> itemDtoList;

}
