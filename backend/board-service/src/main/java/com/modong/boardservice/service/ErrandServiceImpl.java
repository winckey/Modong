package com.modong.boardservice.service;


import com.modong.boardservice.db.entity.Board;
import com.modong.boardservice.db.entity.Errand;
import com.modong.boardservice.db.repository.ErrandRepository;
import com.modong.boardservice.request.ErrandReqDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("errandService")
public class ErrandServiceImpl implements ErrandService{

    @Autowired
    ErrandRepository errandRepository;

    @Override
    public Errand createErrand(ErrandReqDTO errandReqDTO) {


        Errand errand = Errand.ErrandBuilder()
                .description(errandReqDTO.getDescription())
                .userId(errandReqDTO.getUserId())
                .category(errandReqDTO.getCategory())
                .build();


        return errandRepository.save(errand);
    }

    @Override
    public Errand deleteErrand(ErrandReqDTO errandReqDTO) {
        return null;
    }

    @Override
    public Errand updateErrand(ErrandReqDTO errandReqDTO) {
        return null;
    }

    @Override
    public Page<Errand> errandListCalling(Pageable pageable) {
        return null;
    }
}
