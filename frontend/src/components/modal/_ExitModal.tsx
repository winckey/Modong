import React from 'react';
import '../../style/modal/_Modal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export default function ExitModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, info, finish} = props;
 
  const onCloseModal = (e:any) => {
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
          <div>
              <div className='icon'>
                <FontAwesomeIcon  icon={faCircleExclamation} size="6x" color="#0064FF"/>
              </div>
              <header>
                  <div>{info.productName ? info.productName: info.storeName} 접수를</div>
                  <div>삭제하겠어요?</div>
              </header>
          </div>
          <main>
            <button onClick={()=>{finish(info.id); close();}} >확인</button>
          </main>
        </div>
      </section>
    ) : null}
    </div>
  );

}