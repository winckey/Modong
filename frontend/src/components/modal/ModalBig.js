import React from 'react';
import '../../style/_Modal.scss'

// import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalBig() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <TextField onClick={handleClickOpen}
                  id="filled-basic" 
                  label="주소를 입력해주세요" 
                  variant="filled" />

      <Dialog open={open} onClose={handleClose} fullScreen style={{height:'80vh', position:'absolute', top: 170}}>
        <DialogTitle>주소를 입력해주세요</DialogTitle>
        <DialogContent>
          <DialogContentText>
            하,,,,
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="주소"
            type="email"
            fullWidth
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="주소"
            type="email"
            fullWidth
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="주소"
            type="email"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
          onClick={handleClose}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 1 }}
            >
              확인
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
