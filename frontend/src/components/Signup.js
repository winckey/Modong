import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
   
  return (
    <div>
        <p>Signup</p>
        <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;