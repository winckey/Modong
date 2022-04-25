import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {Typography} from "@mui/material"
import TextField from '@mui/material/TextField';


function Signup() {

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="h2" variant="h5">
            입력한 정보가 맞다면
            <br/>
            가입하기 버튼을 눌러주세요!
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', mt: 5 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
            required
            id="standard-required"
            label=" "
            defaultValue="아이디(이메일 주소)"
            variant="standard"
            />
            <TextField
            required
            id="standard-required"
            label=" "
            defaultValue="비밀번호 확인"
            variant="standard"
            />
            <TextField id="standard-basic" label="아이디(이메일 주소)" variant="standard" />
          </div>
        </Box>
        <Link to="/"><button>Login</button></Link>
      </Container>
    </div>
  );
}

export default Signup;