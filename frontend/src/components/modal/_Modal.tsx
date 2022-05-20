import React from 'react';
import '../../style/modal/_Modal.scss'

export default function Modal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;

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
        <div style={{margin: "5%"}}>
          <header>
            기본 모달
          </header>
          <main>
            {info.map((region:any, index:number) => (<div key={index}>{region}</div>))}
            <button onClick={close} >확인</button>
          </main>
        </div>
      </section>
    ) : null}
    </div>
  );

}