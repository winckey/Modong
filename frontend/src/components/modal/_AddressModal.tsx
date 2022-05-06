import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from './_AddressDetailModal.tsx'

import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../style/_base.scss'


export default function AddressModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  // 상세 모달 오픈 
  const [ modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [mode, setMode] = React.useState<number>(0);

 
  const [city, setCityList] = useState([]);
  const [dong, setDongList] = useState([]);


  const [sigu,setInfo] = useState(['서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시',
  '대전광역시', '울산광역시','세종특별자치시','경기도','강원도','충청북도','충청남도','전라북도',
  '전라남도','경상북도']);


  const siguSelected = useSelector((state:Rootstate)=> {
    return state.address.data.sigu
  });

  const citySelected = useSelector((state:Rootstate)=> {
    return state.address.data.city
  });

  const dongSelected = useSelector((state:Rootstate)=> {
    return state.address.data.dong
  });


  useEffect(()=>{
    getCity();
    getDong();
  }, [siguSelected, citySelected]);

  const getCity = async() => {
    axios.get(`/user-service/gugun/${siguSelected}`
    ).then((res)=>{
      // console.log("city info", res.data);
      setCityList(res.data);}
      );

  }

  const getDong = async() => {
    axios.get(`/user-service/dong/${citySelected}/${siguSelected}`
    ).then((res)=> {
      // console.log("dong info", res.data)
      setDongList(res.data);}
      );
  }




  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openModal = (number) => {
    setMode(number)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div>
      <TextField onClick={handleClickOpen}
                  fullWidth
                  id="filled-basic" 
                  value={dongSelected? dongSelected:"주소를 입력해주세요"} 
                  variant="filled" />
      
      <Dialog 
      PaperProps={{ sx: { width: "100%", height: "55vh", 
      position: "fixed", bottom: 0, m: 0, 
      borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
       open={open} onClose={handleClose}  fullScreen>

        <DialogTitle style={{margin:"4%", textAlign:"center"}}><b>주소를 입력해주세요</b></DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="sigu"
            // label="시/구 선택하기"
            fullWidth
            variant="filled"
            onClick={()=>{openModal(0)}}
            autoComplete="off"
            value={siguSelected? siguSelected:"시/구 선택하기"}
          />
          <Modal open={modalOpen}  close={closeModal} header="선택해주세요" sigu={sigu} city={city} dong={dong} mode={mode}  >
          </Modal>
          
          <TextField
            margin="dense"
            id="city"
            // label="구/군 선택하기"
            fullWidth
            variant="filled"
            autoComplete="off"
            onClick={()=>{openModal(1)}}
            value={citySelected? citySelected:"구/군 선택하기"}
          />
          <TextField
            margin="dense"
            id="dong"
            // label="동/읍/면 선택하기"
            fullWidth
            variant="filled"
            autoComplete="off"
            onClick={()=>{openModal(2)}}
            value={dongSelected? dongSelected:"동/읍/면 선택하기"}
          />
        </DialogContent>
        <DialogActions>
          <Button
              style={{backgroundColor: "#0064FF", fontSize: "1.2rem", borderRadius: "10px"}}
              size="large"
              onClick={handleClose}
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2, width: "90%", mx:"auto" }}
            >
              확인
            </Button>
        </DialogActions>

        
      </Dialog>
    </div>
  );
}
