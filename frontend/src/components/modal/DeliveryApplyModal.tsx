import axios ,{AxiosResponse, AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/DeliveryDoneModal.tsx'
import OptionModal from '../modal/DeliveryOptionModal.tsx'

import { useSelector , useDispatch } from "react-redux";
import RootState from "../reducer/reducers.tsx"
let txt = "";
export default function DeliveryModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, wideClose } = props;
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })
  const [ totalCost, setTotalCost] = useState(0);
  const [ orderItems, setOrderItems] = useState([]);
  const addOrder=(options, count, price, menuname)=>{
    setOrderItems(orderItems=>[...orderItems, {
      itemContent: menuname,
      options: options,
      price: price,
      quantity: count
    }])
    setTotalCost(totalCost+price)
  }
  const [ propsOptiondata, setPropsOptiondata ] = useState(null);
  const handleOptionModalOpen =(menu:any)=>{
    setPropsOptiondata(menu)
    optionOpenModal();
  }
  const [ menusli, setMenusLi ] = useState({});
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
      setOrderItems([]);
      setTotalCost(0);
    }
  }
  const transmenu = (menus:any)=>{
    var menu = {}
    menus.map((m:any)=>{
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
  const [ modalOpen, setModalOpen] = useState(false);
  const [ optionModalOpen, setOptionModalOpen] = useState(false);
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
    setModalOpen(true);
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
      console.log(response.data, "배달시키기");
      openModal();
      setOrderItems([]);
      setTotalCost(0);
    })
    .catch((error:AxiosError) => {
        console.log(error, "에러");
    })
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
                  {Object.keys(menusli).map((key:any)=>(
                    <div key={key}>
                      <div className='menucategory'>{key}</div>
                      {menusli[key].map((li:any, index:number)=>(
                        <div onClick={()=>{handleOptionModalOpen(li)}} className='menume' key={index}>{li.name}</div>
                      ))}
                    </div>
                  ))}
                    {/* {menus.map((li:any, index:number)=>(
                      <div key={index}>{li.name}</div>
                    ))} */}
                </div>
                }
                <div className='totalmenus'>
                {orderItems.map((order, index)=>(
                    <div>
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
              <Modal open={modalOpen}  close={closeModal} info={1} wideClose={wideClose}>
              </Modal>
              <OptionModal open={optionModalOpen}  close={optionCloseModal} info={propsOptiondata} addOrder={addOrder}>
              </OptionModal>
            </div>

          </section>
        ) : null}
        </div>
  );

}