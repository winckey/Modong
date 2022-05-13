package com.modong.boardservice.service;

import com.modong.boardservice.db.entity.Errand;
import com.modong.boardservice.request.ErrandReqDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ErrandService {

    //  심부름 등록
    Errand createErrand(ErrandReqDTO errandReqDTO);

    //  심부름 삭제
    Errand deleteErrand(ErrandReqDTO errandReqDTO);

    //  심부름 수정
    Errand updateErrand(ErrandReqDTO errandReqDTO);

    //  심부름 목록 불러오기
    Page<Errand> errandListCalling(Pageable pageable);


}
