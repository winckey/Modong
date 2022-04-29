import React from 'react';
import '../../style/modal/_Modal.scss'

export default function DeliveryModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;

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
                배달 신청하기
              </header>

              <main>
                {info.map((region, index) => (<div key={index}>{region}</div>))}
                <button onClick={close} >확인</button>
              </main>

            </div>

          </section>
        ) : null}
        </div>
  );

}