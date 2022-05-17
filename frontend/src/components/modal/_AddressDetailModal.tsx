import React, { useEffect, useState } from 'react';
import '../../style/modal/_miniModal.scss'
import { useDispatch } from 'react-redux';
import actionCreators from '../../actions/actionCreators.tsx';


export default function _AddressDetailModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, sigu, city, dong, mode } = props;

  const [nowList, setNowList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (mode===0){
      setNowList(sigu);
    } else if (mode===1){
      setNowList(city);
    } else {
      setNowList(dong);
    }
  }, [props]);



  const onCloseModal = (e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget){
      close();
    }
  }


  const selectRegion = (e:any) => {

    if (mode === 0) {
      dispatch(actionCreators.setSigu(e.target.innerText));
      dispatch(actionCreators.setCity("구/군 선택하기"));
      dispatch(actionCreators.setDong("동/읍/면 선택하기"));

    } else if (mode === 1) {
      dispatch(actionCreators.setCity(e.target.innerText));
      dispatch(actionCreators.setDong("동/읍/면 선택하기"));

    } else {
      dispatch(actionCreators.setDong(e.target.innerText));

      nowList.map((it) => it.city === e.target.innerText ? 
      dispatch(actionCreators.setDongCode(it.dongcode)) : {});
    };
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal minimodal' : 'minimodal'}  onClick={onCloseModal}>
      {open ? (
        <section >
          <header>
            {header}
          </header>
          <main>{nowList.map((region, index) => 
          (<div style={{cursor: "pointer", margin: 5}} 
          onClick={selectRegion} key={index}>
            {mode===0 ? region:region.city} </div>))}</main>
        </section>
      ) : null}
    </div>
       
  );
};