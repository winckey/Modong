import axios ,{AxiosResponse, AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/DeliveryDoneModal.tsx'

import { useSelector , useDispatch } from "react-redux";
import RootState from "../reducer/reducers.tsx"

export default function DeliveryModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })
  const [ crawlingData, setCrawlingData ] = useState({});
  const [ menus, setMenus ] = useState<any[]>([]);
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }
  const getCrawlingData =()=>{
    axios.get(`/board-service/group-delivery/read/${info.id}`)
      .then((response:AxiosResponse) => {
        setCrawlingData(response.data)
        setMenus(response.data.menus)
        console.log("크롤링 리스트", response.data)
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  }
  // 신청 완료 모달 
  const [ modalOpen, setModalOpen] = useState(false);
  useEffect(()=>{
    if(info != null){
      getCrawlingData();
    }
  },[info])
  const openModal = () => {
  setModalOpen(true);
  };
  const closeModal = () => {
  setModalOpen(false);
  };
  const handleSubmit=()=>{
    axios.post("/order-service/",{
      boardId: info.id,
      itemDtoList: [
        {
          itemContent: "짜장면",
          options: [
            {
              optionContent: "곱빼기"
            }
          ],
          price: 10000,
          quantity: 1
        }
      ],
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
              {menus.length > 0 &&
                <div className='menuList'>
                    {menus.map((li:any, index:number)=>(
                      <div key={index}>{li.name}</div>
                    ))}
                </div>
                }
                <div>주문받는 div</div>
                <button onClick={()=>{handleSubmit()}} >신청하기</button>
              </main>

            </div>

            <div>
              <Modal open={modalOpen}  close={closeModal} info={1}>
              </Modal>
            </div>

          </section>
        ) : null}
        </div>
  );

}