import React, {useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/GroupBuyingDoneModal.tsx'
import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector } from "react-redux";
import RootState from "../../reducer/reducers.tsx"
import TextField from '@mui/material/TextField';

export default function GroupBuyingApplyModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, wideClose } = props;
  const [productNum, setProductNum] = useState<number>(0);
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })

  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  const handleChangeProductNum=(e:any)=>{
    setProductNum(e.target.value);
  }

  // 신청 완료 모달 
  const [ modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    if (productNum){
      if (new Date(info.closeTime) < new Date()){
        alert("주문시간이 초과 하였습니다.")
        close();
      }else if(parseInt(productNum.toString()) <= 0 || Number.isNaN(Number(productNum))){
        alert("갯수를 확인해주세요!")
      }else{
        axios.post("/order-service/",{
          boardId: info.id,
          itemDtoList: [
            {
              itemContent: info.productName,
              options:[],
              price:productNum*info.price,
              quantity: productNum
            }
          ],
          orderType: "ORDER_GROUP",
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
        })
        .catch((error:AxiosError) => {
          alert("오류입니다 관리자와 이야기 해주세요")
        })
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>
        <div style={{margin: "5%"}}>
          <header>
            <div>
              공구 신청서를 작성해볼까요?
            </div>
          </header>
          <main>
            <div className='buyQuestion'>
              <div><b>{info.productName}</b></div>
              <p>상품을</p>
              <p><b>{info.price}원</b>에 구매해볼까요?</p>
              <TextField id="standard-basic" placeholder="몇개나 살까요?" fullWidth 
              variant="standard" onChange={handleChangeProductNum} value={productNum||""} />
            </div>
            <a href="#" onClick={()=>{window.open(info.url||"https://www.yogiyo.co.kr/mobile/#/")}}>상품을 확인해주세요</a>
            <div className='totalPrice'>
              <div>상품 금액</div>
              <div>{productNum ? info.price*productNum: info.price}원</div>
            </div>
            <button onClick={()=>{openModal()}} >신청하기</button>
          </main>
        </div>
        <div>
            <Modal open={modalOpen}  close={closeModal} info={info} infoNum={productNum} wideClose={wideClose}>
            </Modal>
        </div>
      </section>
    ) : null}
    </div>
  );
}