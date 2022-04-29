import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from './_AddressDetailModal.tsx'


export default function AddressModal() {
  const [open, setOpen] = React.useState(false);
  const [ modalOpen, setModalOpen] = React.useState(false);
  const addressList = ['서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시','대전광역시']


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <TextField onClick={handleClickOpen}
                  id="filled-basic" 
                  label="주소를 입력해주세요" 
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
            id="name"
            label="시/도 선택하기"
            type="email"
            fullWidth
            variant="filled"
            onClick={openModal}
            autoComplete="off"
          />
          <Modal open={modalOpen}  close={closeModal} header="선택해주세요" addressList={addressList}>
          </Modal>
          
          <TextField
            margin="dense"
            id="name"
            label="구/군 선택하기"
            type="email"
            fullWidth
            variant="filled"
            autoComplete="off"
            onClick={openModal}
          />
          <TextField
            margin="dense"
            id="name"
            label="동/읍/면 선택하기"
            type="email"
            fullWidth
            variant="filled"
            autoComplete="off"
            onClick={openModal}
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
