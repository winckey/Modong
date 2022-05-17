import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

import { useDispatch } from 'react-redux';
import actionCreators from '../actions/actionCreators.tsx';

import { useSelector } from 'react-redux';
import '../style/_base.scss';

import Rootstate from '../reducer/reducers.tsx'

const theme = createTheme();

export default function SignUp(props:any) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  //이메일 중복 확인
  const [isValid, setIsValid] = useState<boolean>(false);

  const emailCheck = () => {
    console.log('emailCheck')
  };



  const dongCodeSelected = useSelector((state:Rootstate)=> {
    return state.address.data.dongCode
  });
  const isEmail =(email:string)=>{
    var reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.match(reg_email) != null){
      return false;
    }else{
      return true;
    }
  }
  const isPasssword=(password:string)=>{
    var regPass =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (password.match(regPass) != null){
      return false;
    }else{
      return true;
    }
  }
  const isPhonenum=(phonenum:string)=>{
    var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (phonenum.match(regPhone) != null){
      return false;
    }else{
      return true;
    }
  }
  // 가입하기 버튼
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = {
      userId:formdata.get("email"),
      userPw:formdata.get("password"),
      nickname:formdata.get("Name"),
      phone: formdata.get("phone"),
      // dongcode: "2617010400",
      dongcode: parseInt(dongCodeSelected)
    }
    if (isEmail(formdata.get("email").toString()) || formdata.get("email") === ""){
      alert("이메일 형식이 다릅니다 다시 확인해주세요")
    }else if(isPasssword(formdata.get("password").toString())){
      alert("비밀번호를 입력해주세요 (8자에서 25자 이내 숫자+영문을 섞어주세요)")
    }else if(formdata.get("password") !== formdata.get("passwordConfirmation")){
      alert("비밀번호가 다릅니다 다시 확인해주세요")
    }else if(formdata.get("Name") === ""){
      alert("닉네임을 입력해 주세요")
    }else if(isPhonenum(formdata.get("phone").toString())){
      alert("전화번호를 확인해주세요")
    }else if(dongCodeSelected == null){
      alert("동 선택을 확인해주세요")
    }else{
      console.log(data);
      axios
        .post("/user-service/register", data, {
          headers: {
            "Content-type": "application/json",
            Accept: "*/*",
          },
        })
        .then((response) => {
          console.log(response);
          dispatch(actionCreators.setSigu(null));
          dispatch(actionCreators.setCity(null));
          dispatch(actionCreators.setDong(null));
          navigate("/");
        })
        .catch((error)=>{
          alert("오류입니다 관리자와 이야기 해주세요")
        })
      }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "30%",
            marginX:1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'left'
          }}
        >
          <div>
            <img style={{ width: "80px", position:"absolute", top: "2%", right: "5%" }} 
            src={ require('../assets/logo.png') } alt="사진"/>
          </div>
          <Typography component="h1" variant="h5">
              <b>입력한 정보가 맞다면</b>
             <br/>
              <b>가입하기 버튼을 눌러주세요!</b>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: "6%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
              {/* <Grid item xs={4}>
                <Button style={{backgroundColor:"#0064FF" }} variant="contained" size="small" onClick={emailCheck}>중복확인</Button>
              </Grid> */}
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
                  // autoFocus
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
                  // autoFocus
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="tel"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="전화번호"
                  // autoFocus
                  variant="standard"
                />
              </Grid>

              <Grid item xs={3} 
                style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  주소
              </Grid>
              <Grid item xs={9}>
                <Modal name="address"/>
              </Grid>
              
            </Grid>
            <Button
              className='muiButton'
              style={{backgroundColor: "#0064FF", fontSize: "1.2rem", borderRadius: "10px"}}
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 10, mb: 1 }}
            >
              가입하기
            </Button>
            <div style={{textAlign:'center'}}>
              <Link to="/" style={{color: "black", textDecoration:"none", cursor:"pointer"}}>이미 계정이 있나요?  로그인</Link>
            </div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
