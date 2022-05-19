import React, { useEffect, useState } from 'react';
import '../../style/modal/_Modal.scss';
import axios,{AxiosResponse, AxiosError} from 'axios';

import { groupBuyingRecordDataType, subOptionApartDataType, littleUserType, ordermenuDataType } from "../actions/_interfaces.tsx";

export default function DeliveryRequestedModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [deliveryList, setDeliveryList] = useState<groupBuyingRecordDataType[]>([]);
  const [ userList, setUserList] = useState<any>({});
  const [ menuList, setMenuList ] = useState<any>({});
  const [ totalcost, setTotalcost] = useState<number>(0);
  const [ userImgs, setUserImgs] = useState<any>({});
  useEffect(()=>{
    if (info != null){
      getDeliveryList();
    }
  }, [info])

  const getDeliveryList =()=>{
    axios.get(`/order-service/board/${info.id}/ORDER_DELIVERY`)
    .then((response:AxiosResponse) => {
     console.log(response.data, "from 배달 전체 신청 조회");
     setDeliveryList(response.data);
     })
     .catch((error:AxiosError) => {
       console.log(error, "에러");
       alert("오류 입니다 관리자와 이야기해주세요!")
     })
 }
useEffect(()=>{
  var totalcos = 0
  if(deliveryList.length>0){
    var userLi = {};
    var menuLi = {};
    var userimg = {};
    deliveryList.map((delivery:groupBuyingRecordDataType)=>{
      var menucost = 0;
      var menucount = 0;
      delivery.itemDtoList.map((menu:ordermenuDataType) =>{
        menucost += menu.price*menu.quantity
        menucount += menu.quantity
        var itemnametxt = menu.itemContent
        menu.options.map((option:subOptionApartDataType)=>{
          itemnametxt += "+"+option.optionContent
        })
        if (menuLi[itemnametxt]){
          menuLi[itemnametxt] += menucount
        }else{
          menuLi[itemnametxt] = menucount
        }
      })
      totalcos += menucost
      if (userLi[delivery.userDto.nickname]){
        userLi[delivery.userDto.nickname] += menucost
      }else{
        userimg[delivery.userDto.nickname] = delivery.userDto.image
        userLi[delivery.userDto.nickname] = menucost
      }
    })
    setUserImgs(userimg);
    setUserList(userLi);
    setMenuList(menuLi);
    setTotalcost(totalcos);
  }
}, [deliveryList])
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
            <p className='textover'>{info.storeName}</p>
          </header>
          <main>
            <div className='sizing bottomline'>
              {Object.keys(userList).map((key:string)=>(
              <div className='flex-r' key={key}>
                <div>
                <div className='imgdivs'><img src={ userImgs[key]|| require('../../assets/pingu.png')} alt="사진" /></div>
                  {key}
                </div>
                <div>{userList[key]}원</div>
              </div>
              ))}
            </div>
            <div className='leftstart'>주문 해야할 메뉴</div>
            <div className='sizing'>
              {Object.keys(menuList).map((key:string)=>(
                <div className='flex-r' key={key}>
                  <div className='textover'>{key}</div>
                  <div>{menuList[key]}개</div>
                </div>
              ))}
            </div>
            <div className='flex-r'>
              <div>받아야 할 금액</div>
              <div>{totalcost}원</div>
            </div>
            <button onClick={close} >확인</button>
          </main>
        </div>
      </section>
    ) : null}
    </div>
  );
}