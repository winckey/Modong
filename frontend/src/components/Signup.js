import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {Typography} from "@mui/material"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Modal from './modal/_AddressModal.tsx'

const theme = createTheme();

export default function SignUp(props) {

  //이메일 중복 확인
  const emailCheck = () => {

  };


  // 가입하기 버튼
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
      email:formdata.get("email"),
      password:formdata.get("password"),
      passwordConfirmation:formdata.get("passwordConfirmation"),
      username:formdata.get("Name"),
      phone: formdata.get("phone")
    }
    console.log(data);
    axios
      .post("/accounts/signup/", data, {
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => {
        console.log(response)
        // handleCloseModal();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response);
      });
  // const handleCloseModal = () => {
  //   props.closemodal();
  // };
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginX:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'left'
          }}
        >
          {/* <button onClick={openModal}>모달팝업</button> */}
          <Typography component="h1" variant="h5">
              입력한 정보가 맞다면
             <br/>
              가입하기 버튼을 눌러주세요!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="아이디(이메일 주소)"
                    name="email"
                    autoComplete="email"
                    variant="standard"
                    autoFocus
                  />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="small">중복확인</Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="비밀번호확인"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  variant="standard"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="닉네임"
                  autoFocus
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="전화번호"
                  autoFocus
                  variant="standard"
                />
              </Grid>
              <Grid item xs={3} 
                style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  주소
              </Grid>
              <Grid item xs={9}>
                <Modal/>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 1 }}
            >
              가입하기
            </Button>
            <div style={{textAlign:'center'}}>
              <Link to="/">이미 계정이 있나요?  로그인</Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
