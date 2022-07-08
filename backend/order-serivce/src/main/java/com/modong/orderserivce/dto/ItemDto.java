package com.modong.orderserivce.dto;

import com.modong.orderserivce.entity.Items;
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



    public static List<ItemDto> of(List<Items> itemsList) {

        List<ItemDto> itemDtoList = new ArrayList<>();

        for (Items items : itemsList){
            ItemDto itemDto = ItemDto.builder()
                    .itemContent(items.getItemContent())
                    .quantity(items.getQuantity())
                    .price(items.getPrice())
                    .build();

            itemDto.setOptions(OptionDto.of(items.getOptionList()));

            itemDtoList.add(itemDto);
        }


        return itemDtoList;
    }
}
