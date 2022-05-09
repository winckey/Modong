import React from 'react';
import '../../style/modal/_Modal.scss'

export default function _ApplyHistoryModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, infoNum } = props;

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>

        <div style={{margin: "5%"}}>

          <header>
            {info.Price*infoNum}
          </header>

          <main>
            <div>{info.productName}</div>
            <div>{info.Price}</div>
            <div>{infoNum}</div>
            <div>유저 정보</div>
            <button onClick={close} >확인</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}