package com.example.chattingservice.data.response;

import com.example.chattingservice.data.dto.UserDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
// ^^NotNull, Size, Email...등 제약사항 추가
public class RoomRes{
	@ApiModelProperty(name="채팅방 id", example = "1234")
	private Long roomId;

	@ApiModelProperty(name="채팅방 이름", example = "오나라 식탁")
	private String name;

	@ApiModelProperty(name="채팅방 종류", example = "배달")
	private String type;

	@ApiModelProperty(name="참여인원수", example = "3")
	private int numberUser;

	@ApiModelProperty(name="참여 명단")
	private List<UserDto> userList;

}
