import axios,{AxiosResponse, AxiosError} from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/modal/_Modal.scss'

export default function GroupBuyingRequestedModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const [groupApplicationList, setGroupApplicationList] = useState([]);
  const [productTotalNum, setProductTotalNum] = useState(0);
  useEffect(()=>{
    if (info != null){
      getGroupApplicationList();
    }
  }, [info])
  const sumTotalNum=(data:any)=>{
    let total = 0;
    data.map((d:any)=>(
      total+=d.itemDtoList.quantity
    ))
    setProductTotalNum(total)
  }
  const getGroupApplicationList =()=>{
     axios.get(`/order-service/board/${info.id}/ORDER_GROUP`)
     .then((response:AxiosResponse) => {
      console.log(response.data, "from 전체 신청 조회");
      setGroupApplicationList(response.data);
      sumTotalNum(response.data);
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
            {info.productName}
          </header>

          <main className='GroupBuyingReq'>
            <div>
              {groupApplicationList.map((data, index) => (
              <div key={data.id}>
                <div>11</div>
                <div>{parseInt(info.price)*data.itemDtoList.quantity}</div>
              </div>
              ))}
            </div>
            <div className='productcount'>수량</div>
            <div>
              <div>{info.productName}</div>
              <div>{productTotalNum}개</div>
            </div>
            <div>
              <div>받아야 할 금액</div>
              <div>{productTotalNum*parseInt(info.price)}</div>
            </div>

            <button onClick={close} >확인</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}