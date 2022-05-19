import React, { useState, useEffect } from 'react';
import '../../style/modal/_Modal.scss'

import { ordermenuDataType } from "../../actions/_interfaces.tsx"

export default function _ApplyHistoryModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [ totalsum, setTotalsum ] = useState<number>(0);
  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      setTotalsum(0)
      close();
    }
  }
  const totalprice = () =>{
    info.itemDtoList.map((d:ordermenuDataType)=>{
      setTotalsum(totalsum+d.price)
    })
  }
  useEffect(()=>{
    console.log("2222222222222", info)
    if(info != null){
      totalprice();
    }
  }, [info])
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>
        <div style={{margin: "10%"}}>
          <div className="title">
          {info.itemDtoList[0].itemContent||""} 외 {info.itemDtoList.length-1}개
          </div>
          <main>
            <div className="historyBox">
              <div>
                <p>가격</p>
                <p>{totalsum}원</p>
              </div>
              <div>
                <p>수량</p>
                <p>{info.itemDtoList.length}개</p>
              </div>
            </div>
            <button onClick={close} >확인</button>
          </main>
        </div>
      </section>
    ) : null}
    </div>
  );

}