package com.modong.orderserivce.entity;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "주문타입", description = "배달 , 공구 ")
public enum OrderType {


    @ApiModelProperty(value = "배달")
    ORDER_DELIVERY,

    @ApiModelProperty(value = "공구")
    ORDER_GROUP

}
