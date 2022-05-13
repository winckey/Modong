package com.modong.orderserivce.dto;

import com.modong.orderserivce.entity.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    @Schema(example = "짜장면")
    private String itemContent;


    private List<OptionDto> options;

    @Schema(example = "1")
    private int quantity;

    @Schema(example = "10000")
    private int price;



    public static List<ItemDto> of(List<Item> itemList) {

        List<ItemDto> itemDtoList = new ArrayList<>();

        for (Item item: itemList ){
            ItemDto itemDto = ItemDto.builder()
                    .itemContent(item.getItemContent())
                    .quantity(item.getQuantity())
                    .price(item.getPrice())
                    .build();

            itemDto.setOptions(OptionDto.of(item.getOptionList()));

            itemDtoList.add(itemDto);
        }


        return itemDtoList;
    }
}
