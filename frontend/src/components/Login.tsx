import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const theme = createTheme();

export default function Login(props) {

  const dispatch = useDispatch();
    const setIsLogin = () => {
        dispatch(actionCreators.setIsLogin(true));
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert("A name was submitted: " + data.get("email") + " " + data.get("password"));
    axios
      .post(
        "/accounts/api-token-auth/",
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "*/*",
          },
        }
      )
      .then((response) => {
        console.log(response, "from login");
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user_email", data.get("email"));
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from login");
      });
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
          }}
        >
          <div>
            <img style={{ width: "70%" }} src={ require('../assets/logo.png') } alt="사진"/>
          </div>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="아이디(이메일 주소)"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
            />
            <FormGroup>
              <FormControlLabel control={<Checkbox/>} label="로그인 상태 유지" />
            </FormGroup>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 40, mb: 2 }}
              onClick={setIsLogin}
            >
              로그인
            </Button>
            <Link to="/signup">계정이 필요한가요? 가입하기</Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}