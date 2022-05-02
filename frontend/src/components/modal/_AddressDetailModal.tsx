import React from 'react';
import '../../style/modal/_miniModal.scss'

export default function _AddressDetailModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, info } = props;

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  const selectRegion = (e) => {
    console.log(e.target)
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal minimodal' : 'minimodal'}  onClick={onCloseModal}>
      {open ? (
        <section >
          <header>
            {header}
          </header>
          <main>{info.map((region, index) => 
          (<div style={{cursor: "pointer", margin: 5}} 
          onClick={selectRegion} key={index}>{region} </div>))}</main>
        </section>
      ) : null}
    </div>
       
  );
};