import React from 'react';
import '../../style/modal/_Modal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import Modal from '../modal/_ApplyHistoryModal.tsx'


export default function GroupBuyingDoneModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info } = props;
  const data =["dd"]
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  const [ modalOpen, setModalOpen] = React.useState(false);
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

          <div>
              <div>
                <FontAwesomeIcon  icon={faCircleExclamation} size="6x" color="#0064FF"/>
              </div>

              <div>
                  <button onClick={()=>{openModal();}}>신청 내역 확인</button>
                  <p>내용</p>
                  <p>{info}</p>
              </div>

          </div>

          <main>
            <button onClick={close} >확인</button>
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