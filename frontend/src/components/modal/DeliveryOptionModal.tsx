import React, {useEffect, useState} from 'react';
import '../../style/modal/_Modal.scss'

import {subOptionApartDataType, menuDataType, optionDataType, subOptionDataType} from '../../actions/_interfaces.tsx'
export default function DeliveryDoneModal(props:any)  {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [ selectOptionList, setSelectOptionList ] = useState<subOptionApartDataType[]>([]);
  const [ totalCost, setTotalCost] = useState<number>(0);
  const [ count, setCount] = useState<number>(0);
  const { open, close, info, addOrder } = props;
  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      close();
    }
  }
  const handleCountChange=(e:any)=>{
    setCount(e.target.value)
  }
  const addmenu = (e:any) => {
    if (e.target === e.currentTarget){
      if(count > 0){
        if (info != null){
          var totalSum = totalCost;
          info.subchoices.map((d:menuDataType)=>{
            document.getElementsByName(d.name).forEach((node:any)=>{
              if (node.checked) {
                totalSum+=parseInt(d.subchoices[node.value].price);
                selectOptionList.push({ optionContent: d.subchoices[node.value].name });
              }
            })
          })
        }
        close();
        addOrder(selectOptionList, count, totalSum*count, info.name);
        setSelectOptionList([]);
        setTotalCost(0);
        setCount(0);
      }else{
        alert("갯수를 확인해 주세요");
      }
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
        <div className='h1size'>
          {info.name}
        </div>
        }
        <div style={{margin: "5%"}}>
          <main>
            {info != null &&
            <div className='optionList'>
              {info.subchoices.map((cate:optionDataType, index:number)=>(
                <div key={index}>
                  <div className='optioncate'>{cate.name}</div>
                  {cate.subchoices.map((option:subOptionDataType, idx:number)=>(
                    <div key={index}>
                      {cate.multiple ? (
                        <div className='optiondetail'>
                          <label>{option.name}(+{option.price})</label><input type="checkbox" name={cate.name} value={idx}/>
                        </div>
                      ):(
                        <div className='optiondetail'>
                          <label>{option.name}(+{option.price})</label><input type="radio" name={cate.name} value={idx}/>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            }
            <div className='flex-r-p'><label>갯수</label><input type="number" value={count} onChange={handleCountChange}/></div>
            <button onClick={addmenu} >신청하기</button>
          </main>

        </div>

      </section>
    ) : null}
    </div>
  );

}