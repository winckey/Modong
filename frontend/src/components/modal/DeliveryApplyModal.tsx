import axios ,{AxiosResponse, AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/DeliveryDoneModal.tsx'
import OptionModal from '../modal/DeliveryOptionModal.tsx'

import { useSelector , useDispatch } from "react-redux";
import RootState from "../reducer/reducers.tsx"

import {menuDataType, subOptionApartDataType, orderDataType} from "../../actions/_interfaces.tsx"

export default function DeliveryModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, wideClose } = props;
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })
  const [ totalCost, setTotalCost] = useState<number>(0);
  const [ orderItems, setOrderItems] = useState<orderDataType[]>([]);
  const addOrder=(options:subOptionApartDataType[], count:number, price:number, menuname:string)=>{
    setOrderItems(orderItems=>[...orderItems, {
      itemContent: menuname,
      options: options,
      price: price,
      quantity: count
    }])
    setTotalCost(totalCost+price)
  }
  const [ propsOptiondata, setPropsOptiondata ] = useState<menuDataType>(null);
  const handleOptionModalOpen =(menu:menuDataType)=>{
    setPropsOptiondata(menu)
    optionOpenModal();
  }
  const [ menusli, setMenusLi ] = useState<menuDataType>({});
  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      close();
      setOrderItems([]);
      setTotalCost(0);
    }
  }
  const transmenu = (menus:menuDataType[])=>{
    var menu = {}
    menus.map((m:menuDataType)=>{
      if(m.section != "top_items"){
        if(menu[m.section]){
          menu[m.section].push(m)
        }else{
          menu[m.section] = []
        }
      }
    })
    setMenusLi(menu)
  }
  const getCrawlingData =()=>{
    axios.get(`/board-service/group-delivery/read/${info.id}`)
      .then((response:AxiosResponse) => {
        transmenu(response.data.menus)
        console.log("크롤링 리스트", response.data)
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  }
  // 신청 완료 모달 
  const [ modalOpen, setModalOpen] = useState<boolean>(false);
  const [ optionModalOpen, setOptionModalOpen] = useState<boolean>(false);
  useEffect(()=>{
    if(info != null){
      getCrawlingData();
    }
  },[info])
 

  const closeModal = () => {
    setModalOpen(false);
  };
  const optionOpenModal = () => {
    setOptionModalOpen(true);
  };
  const optionCloseModal = () => {
    setOptionModalOpen(false);
    setPropsOptiondata(null);
  };

  const openModal=()=>{
    if(orderItems.length === 0){
      alert("메뉴를 선택해주세요");
    }else{
      axios.post("/order-service/",{
        boardId: info.id,
        itemDtoList: orderItems,
        orderType: "ORDER_DELIVERY",
        userId: userId
      },
      {
          headers: {
              "Content-type": "application/json",
              Accept: "*/*",
          },
      })
      .then((response:AxiosResponse) => {
        setModalOpen(true);
        setOrderItems([]);
        console.log(response.data, "Rmx")
      })
      .catch((error:AxiosError) => {
          console.log(error, "에러");
          alert("오류입니다 관리자와 이야기해주세요")
      })
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
              {Object.keys(menusli).length > 0 &&
              
                <div className='menuList'>
                  {Object.keys(menusli).map((key:string)=>(
                    <div key={key}>
                      <div className='menucategory'>{key}</div>
                      {menusli[key].map((li:any, index:number)=>(
                        <div onClick={()=>{handleOptionModalOpen(li)}} className='menume' key={index}>{li.name}</div>
                      ))}
                    </div>
                  ))}
                </div>
                }
                <div className='totalmenus'>
                {orderItems.map((order, index)=>(
                    <div key={index}>
                      <div>{order.itemContent}</div>
                      <div>{order.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className='deliverycost'><span>총금액</span><span>{totalCost}원</span></div>
                <button onClick={()=>{openModal()}} >신청하기</button>
              </main>

            </div>

            <div>
              <Modal open={modalOpen}  close={closeModal} userinfo={info.userInfo} totalCost={totalCost} orderItems={orderItems} wideClose={wideClose}>
              </Modal>
              <OptionModal open={optionModalOpen}  close={optionCloseModal} info={propsOptiondata} addOrder={addOrder}>
              </OptionModal>
            </div>

          </section>
        ) : null}
        </div>
  );

}