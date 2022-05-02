import React, {useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/GroupBuyingDoneModal.tsx'

export default function GroupBuyingApplyModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const data = ["ㅇㅇㅇ"]
    console.log(info[0])
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  // 신청 완료 모달 
  const [ modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
    setModalOpen(true);
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
            <p><b>{info[0]["name"]}</b> 상품을</p>
            <p><b>{info[0]["lefttime"]}원</b>에 구매해볼까요?</p>
            <input placeholder="몇개나 살까요?"></input>

            <div>
                상품금액
            </div>

            <button onClick={()=>{openModal();}} >신청하기</button>
          </main>

        </div>

        <div>
            <Modal open={modalOpen}  close={closeModal} info={data}>
            </Modal>
        </div>

      </section>
    ) : null}
    </div>
  );

}