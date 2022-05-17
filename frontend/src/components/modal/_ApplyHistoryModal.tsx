import React from 'react';
import '../../style/modal/_Modal.scss'

export default function _ApplyHistoryModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, infoNum, wideClose } = props;

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
            {info.price*infoNum}원
          </div>

          <main>

            <div className="historyBox">
              <div>
                <p>물품</p>
                <p>{info.productName}</p>
              </div>
              <div>
                <p>가격</p>
                <p>{info.price}원</p>
              </div>
              <div>
                <p>수량</p>
                <p>{infoNum}개</p>
              </div>
              <hr/>
              <div>
                <p>판매자</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                  {/* <img src={ require('../../assets/pingu.png') } alt="사진"/> */}
                  <p>{info.userInfo.userId}</p>
                </div>
              </div>
            </div>

            <button onClick={()=>{close(); wideClose(false);}} >확인</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}