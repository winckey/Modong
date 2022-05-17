import React, { useState, useEffect } from 'react';
import '../../style/modal/_Modal.scss'

export default function _ApplyHistoryModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [ totalsum, setTotalsum ] = useState<number>(0);
  const [ totalcount, setTotalcount ] = useState<number>(0);
  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      setTotalsum(0);
      setTotalcount(0);
      close();
    }
  }
  const totalprice = () =>{
    info.itemDtoList.map((d)=>{
      setTotalsum(totalsum+parseInt(d.price))
      setTotalcount(totalcount+d.quantity)
    })
  }
  useEffect(()=>{
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
            {parseInt(info.boardDto.price)*totalcount}원
          </div>

          <main>

            <div className="historyBox">
              <div>
                <p>물품</p>
                <p>{info.boardDto.productName||""}</p>
              </div>
              <div>
                <p>가격</p>
                <p>{totalsum}원</p>
              </div>
              <div>
                <p>갯수</p>
                <p>{totalcount}개</p>
              </div>
              <hr/>
              <div>
                <p>판매자</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                  {/* <img src={ require('../../assets/pingu.png') } alt="사진"/> */}
                  <p>{info.userDto.nickname}</p>
                </div>
              </div>
            </div>

            <button onClick={onCloseModal} >확인</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}