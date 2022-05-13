import React, {useEffect, useState} from 'react';
import '../../style/modal/_Modal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import Modal from '../modal/_ApplyHistoryModal.tsx'


export default function DeliveryDoneModal(props)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [ selectOptionList, setSelectOptionList ] = useState([]);
  const [ totalCost, setTotalCost] = useState(0);
  const [ count, setCount] = useState(0);
  const { open, close, info, addOrder } = props;
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget){
      close();
    }
  }
  const handleCountChange=(e)=>{
    setCount(e.target.value)
  }
  const addmenu = (e) => {
    if (e.target === e.currentTarget){
      if (info != null){
        info.subchoices.map((d:any)=>{
          document.getElementsByName(d.name).forEach((node:any)=>{
            if (node.checked) {
              setTotalCost(totalCost+parseInt(d.subchoices[node.value].price));
              selectOptionList.push({ optionContent: d.subchoices[node.value].name });
            }
          })
        })
      }
      
      close();
      addOrder(selectOptionList, count, totalCost*count, info.name);
    }
  }
  useEffect(()=>{
    if(info != null){
      setSelectOptionList([])
      setTotalCost(parseInt(info.price))
    }else{
      setTotalCost(0)
      setCount(0)
    }
  }, [info])
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>
        {info != null &&
        <div>
          {info.name}
        </div>
        }
        <div style={{margin: "5%"}}>
          <main>
            {info != null &&
            <div className='optionList'>
              {info.subchoices.map((cate:any, index:number)=>(
                <div>
                  <div className='optioncate'>{cate.name}</div>
                  {cate.subchoices.map((option:any, idx:number)=>(
                    <div>
                      {cate.multiple ? (
                        <div className='optiondetail'>
                          <label>{option.name}</label><input type="checkbox" name={cate.name} value={idx}/>
                        </div>
                      ):(
                        <div className='optiondetail'>
                          <label>{option.name}</label><input type="radio" name={cate.name} value={idx}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            }
            <div><label>갯수</label><input type="number" value={count} onChange={handleCountChange}/></div>
            <button onClick={addmenu} >신청하기</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}