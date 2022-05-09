import React, {useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/GroupBuyingDoneModal.tsx'
import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector , useDispatch } from "react-redux";
import actionCreators from '../../actions/actionCreators.tsx';
import RootState from "../../reducer/reducers.tsx"

export default function GroupBuyingApplyModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [productNum, setProductNum] = useState();
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }
  const handleChangeProductNum=(e)=>{
    setProductNum(e.target.value);
  }
  // 신청 완료 모달 
  const [ modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      axios.post("/order-service/",{
          boardId: info.id,
          itemDtoList: [
            {
              itemContent: info.productName,
              options:[]
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
          console.log(response.data, "모달 오픈")
          setModalOpen(true);
        })
        .catch((error:AxiosError) => {
          console.log(error, "에러");
        })
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
            공구 신청서를 작성해볼까요?
          </header>

          <main>
            <p><b>{info.productName}</b> 상품을</p>
            <p><b>{info.price}원</b>에 구매해볼까요?</p>
            <input onChange={handleChangeProductNum} value={productNum} placeholder="몇개나 살까요?"></input>

            <div>
                상품금액
            </div>

            <button onClick={()=>{openModal()}} >신청하기</button>
          </main>

        </div>

        <div>
            <Modal open={modalOpen}  close={closeModal} info={info} infoNum={productNum}>
            </Modal>
        </div>

      </section>
    ) : null}
    </div>
  );

}