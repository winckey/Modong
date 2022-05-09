package com.modong.orderserivce.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ReqIdOrderDto {

    @Schema(example = "1" , description = "게시글 id 기준")
    private Long boardId;

    @Schema(example = "1" , description = "주문 id 기준")
    private Long orderId;

    @Schema(example = "1" , description = "사용자 id 기준")
    private Long userId;
}
