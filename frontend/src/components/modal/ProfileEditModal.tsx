import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import Rootstate from '../../reducer/reducers.tsx'
import axios from 'axios';


export default function ProfileEditModal() {
  //모달 열고, 닫기
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  // 프로필 수정 
  const user = useSelector((state:Rootstate) => {
    return state.accounts.data.user
  });

  const handleProfileEdit = (event) => {
    handleClose();
    const formdata = new FormData(event.currentTarget);
    const data = {
      userId:formdata.get("email"),
      nickname:formdata.get("Name"),
      phone: formdata.get("phone"),
      dongcode: "2617010400",
      // dongcode: parseInt(dongCodeSelected)
    }
    console.log(data)
    

  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{position:"absolute", right: "5%", color: "gray", cursor:"pointer"}}>수정</Button>
      
      <Dialog 
      PaperProps={{ sx: { width: "100%", height: "75vh", 
      position: "fixed", bottom: 0, m: 0, 
      borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
       open={open} onClose={handleClose}  fullScreen>

        <DialogTitle style={{margin:"4%", textAlign:"center"}}><b>프로필 수정</b></DialogTitle>
        <DialogContent>
            <p>닉네임</p>
            <TextField
                margin="dense"
                id="name"
                name="name"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                // value={user.nickname}
                label={user.nickname}
            />

            <p>이메일 주소</p>
            <TextField
                margin="dense"
                id="email"
                name="email"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />

            <p>주소</p>
            <TextField
                margin="dense"
                id="address"
                name="address"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />

            <p>전화번호</p>
            <TextField
                margin="dense"
                id="phone"
                name="phone"
                type="phone"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />
          
         
        </DialogContent>
        <DialogActions>
          <Button
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
