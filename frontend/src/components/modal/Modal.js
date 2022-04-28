import React from 'react';
import '../../style/_Modal.scss'

export default function DetailModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, addressList } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

        <div className={open ? 'openModal modal' : 'modal'} >
        {open ? (
          <section>
              <button onClick={close}>
                &times;
              </button>
            <main>
              {addressList.map((region, index) => (<div key={index}>{region}</div>))}
              <button onClick={close} >확인</button>
            </main>
            
          </section>
        ) : null}
        </div>
  );

}