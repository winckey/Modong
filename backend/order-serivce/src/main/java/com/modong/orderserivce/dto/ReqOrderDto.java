package com.modong.orderserivce.dto;

import com.modong.orderserivce.entity.Item;
import com.modong.orderserivce.entity.Order;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReqOrderDto {

    @Schema(example = "1")
    private Long boardId;

    @Schema(example = "1")
    private Long userId;


    private List<ItemDto> itemDtoList;


    public static ReqOrderDto of(Order order) {
        ReqOrderDto orderDto = ReqOrderDto.builder()
                .boardId(order.getBoardId())
                .userId(order.getUserId())

                .build();
        orderDto.setItemDtoList(ItemDto.of(order.getItemList()));
        return orderDto;
    }

}
