package com.example.chattingservice.data.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
// ^^NotNull, Size, Email...등 제약사항 추가
public class CreateRoomRes {
	@ApiModelProperty(name="채팅방 번호", example = "1234")
	private Long roomId;
	
}
