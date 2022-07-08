package com.modong.orderserivce.dto;

import com.modong.orderserivce.entity.OrderType;
import com.modong.orderserivce.entity.Orders;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel
public class ReqOrderDto {

    @Schema(example = "1")
    private Long boardId;

    @Schema(example = "1")
    private Long userId;


    @Schema(example = "ORDER_DELIVERY")
    @ApiModelProperty
    private OrderType orderType;

    @Schema(hidden = true)
    private BoardDto boardDto;

    @Schema(hidden = true)
    private UserDto userDto;

    private List<ItemDto> itemDtoList;


    public static ReqOrderDto of(Orders orders) {
        ReqOrderDto orderDto = ReqOrderDto.builder()
                .boardId(orders.getBoardId())
                .userId(orders.getUserId())
                .orderType(orders.getOrderType())

                .build();
//        orderDto.setItemDtoList(ItemDto.of(order.getProdoctList()));
        return orderDto;
    }

}
