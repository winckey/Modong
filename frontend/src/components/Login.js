import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators';

function Login() {
  const dispatch = useDispatch();
    const setIsLogin = () => {
        dispatch(actionCreators.setIsLogin(true));
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