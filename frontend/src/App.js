import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Account from './components/Account'
import Nav from './components/Nav'
import { useSelector } from "react-redux";
import Modal from './components/modal/Modal'


function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const { isLogin } = useSelector(state => ({
    isLogin : state.ischeck.data.isLogin
  }))
  return (
    <BrowserRouter>
      <div className="App">
        <button onClick={openModal}>모달팝업</button>
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
         에 내용이 입력된다. 리액트 함수형 모달
        팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
      </Modal>
        {isLogin 
          ? <Nav/>
          : <Account/>}
      </div>
    </BrowserRouter>
  );
}

export default App;
