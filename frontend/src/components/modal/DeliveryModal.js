import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function Modal() {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
        <Typography   onClick={handleClickOpen} style={{cursor:"pointer"}}>
            신청하기
        </Typography>
      
      <Dialog 
      PaperProps={{ sx: { width: "100%", height: "77vh", 
      position: "fixed", bottom: 0, 
      borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
       open={open} onClose={handleClose}  fullScreen>

        <DialogTitle style={{margin:"4%"}}><b>제목!!</b></DialogTitle>

        <DialogContent>
          요기다가 내용 넣어야함
        </DialogContent>

        <DialogActions>
          <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
              sx={{ mt: 5, mb: 3, width: "95%", height: "50%", mx:"auto", backgroundColor:"#0064FF" }}
            >
              확인
            </Button>
        </DialogActions>

        
      </Dialog>
    </div>
  );
}
