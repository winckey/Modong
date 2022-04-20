import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const setIsLogin = () => {
    props.setIsLogin();
  }
  return (
    <div>
        <p>Login</p>
        <Link to="/signup">Signup</Link>
        <button onClick={setIsLogin}>로그인</button>
    </div>
  );
}

export default Login;