package com.modong.boardservice.controller;


import com.modong.boardservice.request.ErrandReqDTO;
import com.modong.boardservice.service.ErrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/errand")
public class ErrandController {

    @Autowired
    ErrandService errandService;
    //심부름 등록
    @PostMapping
    public ResponseEntity errandCreate(@RequestBody ErrandReqDTO errandReqDTO) {


        errandService.createErrand(errandReqDTO);

        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //심부름 삭제
    @DeleteMapping
    public ResponseEntity errandDelete(@RequestBody ErrandReqDTO errandReqDTO) {



        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //심부름 수정
    @PutMapping
    public ResponseEntity errandUpdate(@RequestBody ErrandReqDTO errandReqDTO) {


        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    //심부름 목록 조회(Pagination, 10개)
    @GetMapping
    public ResponseEntity errandList(@PageableDefault(page = 0, size = 10) Pageable pageable) {


        return new ResponseEntity<>("s", HttpStatus.OK);
    }

    //심부름 상세 조회
    @GetMapping("/{errandId}")
    public ResponseEntity errandRead(@PathVariable Long errandId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return new ResponseEntity<>("s", HttpStatus.OK);
    }


}
