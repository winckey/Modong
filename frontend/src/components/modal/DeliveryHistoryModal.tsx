import React from 'react';
import '../../style/modal/_Modal.scss'

export default function DeliveryHistoryModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, userinfo, totalCost, orderItems, wideClose, doneClose } = props;
  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>
        <div style={{margin: "10%"}}>
          <div className="title">
            {orderItems.length>0 &&
              <p className='textover'>{orderItems[0].itemContent}외 {orderItems.length-1}메뉴</p>
            }
          </div>
          <main>
            <div className="historyBox">
              <div>
                <p>가격</p>
                <p>{totalCost}원</p>
              </div>
              <div>
                <p>수량</p>
                <p>{orderItems.length}개</p>
              </div>
              <hr/>
              <div>
                <p>판매자</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <div className='imgdivs'>
                    <img src={ userinfo.image || require('../../assets/pingu.png') } alt="사진"/>
                  </div>
                  {!!userinfo &&
                  <p>{userinfo.nickname||""}</p>
                  }
                </div>
              </div>
            </div>
            <button onClick={()=>{close(); wideClose(false); doneClose(false);}} >확인</button>
          </main>
        </div>
      </section>
    ) : null}
    </div>
  );
}