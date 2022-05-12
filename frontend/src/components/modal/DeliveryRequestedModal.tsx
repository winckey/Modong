import React, { useEffect, useState } from 'react';
import '../../style/modal/_Modal.scss';
import axios,{AxiosResponse, AxiosError} from 'axios';

export default function DeliveryRequestedModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [deliveryList, setDeliveryList] = useState([]);
  useEffect(()=>{
    if (info != null){
      getDeliveryList();
    }
  }, [info])

  const getDeliveryList =()=>{
    axios.get(`/order-service/board/${info.id}/Delivery_GROUP`)
    .then((response:AxiosResponse) => {
     console.log(response.data, "from 전체 신청 조회");
     setDeliveryList(response.data);
     })
     .catch((error:AxiosError) => {
       console.log(error, "에러");
     })
 }

  const onCloseModal = (e) => {
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
            {info.storeName}
          </header>

          <main>
            {deliveryList.map((data, index) => (
            <div>
              <div>{data.itemDtoList.itemContent}</div>
              <div>10000</div>
            </div>
            ))}
            <div>주문 해야할 메뉴</div>
            {/* <div>
              <div>{info.productName}</div>
              <div>{productTotalNum}개</div>
            </div> */}
            <div>
              <div>받아야 할 금액</div>
              {/* <div>{productTotalNum*parseInt(info.price)}</div> */}
            </div>
            <button onClick={close} >확인</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}