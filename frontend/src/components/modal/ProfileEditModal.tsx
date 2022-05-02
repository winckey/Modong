import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function ProfileEditModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button onClick={handleClickOpen}>수정</Button>
      
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
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />

            <p>이메일 주소</p>
            <TextField
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />

            <p>주소</p>
            <TextField
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />

            <p>전화번호</p>
            <TextField
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="filled"
                autoComplete="off"
                value="강냉이"
            />
          


         
        </DialogContent>
        <DialogActions>
          <Button
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
