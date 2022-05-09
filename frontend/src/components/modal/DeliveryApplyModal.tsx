import React, {useState} from 'react';
import '../../style/modal/_Modal.scss'
import Modal from '../modal/DeliveryDoneModal.tsx'

export default function DeliveryModal(props)  {
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
                배달 신청하기
              </header>
            
              <main>
                <div>대충 내용</div>
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