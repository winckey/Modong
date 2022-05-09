import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import Rootstate from '../../reducer/reducers.tsx'
import axios from 'axios';
import actionCreators from '../../actions/actionCreators.tsx';
import '../../style/_base.scss'
import Modal from './_AddressModal.tsx'

export default function ProfileEditModal() {
  //모달 열고, 닫기
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const dispatch = useDispatch();
  const user = useSelector((state:Rootstate) => {
    return state.accounts.data.user
  });


  const dongSelected = useSelector((state:Rootstate)=> {
    return state.address.data.dong
  });

  const dongCodeSelected = useSelector((state:Rootstate)=> {
    return state.address.data.dongCode
  });


  const [state, setState] = useState({
    nickname: user.nickname,
    userId: user.userId,
    phone: user.phone,
  });


  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }



  // 프로필 수정 
  const handleProfileEdit = (event) => {
    handleClose();
    const data = {
      ...user,
      userId: state.userId,
      nickname:state.nickname,
      phone: state.phone,
      dongDto: {dong: dongSelected, dongcode: dongCodeSelected}
      
    };

    
    axios.put("/user-service/users",
    {
      dongcode: dongCodeSelected,
      id: user.id,
      nickname: state.nickname,
      phone: state.phone,
      userId: state.userId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((res)=> {
      console.log("put요청 성공", res);
      dispatch(actionCreators.setUser(data));
      console.log(user)
    }).catch((err)=> {
      console.log("put 요청 실패", err);
    })
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{position:"absolute", right: "5%", color: "gray", cursor:"pointer"}}>수정</Button>
      
      <Dialog 
      PaperProps={{ sx: { width: "100%", height: "88vh", 
      position: "fixed", bottom: 0, m: 0, 
      borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
       open={open} onClose={handleClose}  fullScreen>

        <DialogTitle style={{margin:"4%", textAlign:"center"}}><b>프로필 수정</b></DialogTitle>
        <DialogContent>
            <p>닉네임</p>
            <TextField
                margin="dense"
                name="nickname"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value={state.nickname}
                onChange={handleChangeState}
            />

            <p>이메일 주소</p>
            <TextField
                margin="dense"
                // id="email"
                name="userId"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value={state.userId}
                onChange={handleChangeState}
            />

            <p>주소</p>
            <Modal/>

            <p>전화번호</p>
            <TextField
                margin="dense"
                // id="phone"
                name="phone"
                type="phone"
                fullWidth
                variant="filled"
                autoComplete="off"
                value={state.phone}
                onChange={handleChangeState}
            />
          
         
        </DialogContent>
        <DialogActions>
          <Button
              style={{backgroundColor: "#0064FF", fontSize: "1.2rem", borderRadius: "10px"}}
              size="large"
              onClick={handleProfileEdit}
              type="submit"
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
