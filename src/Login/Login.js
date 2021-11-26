import React from 'react';
import { Button } from "@material-ui/core";
import {useNavigate} from 'react-router-dom';
import "./Login.css";
const Login = () => {
    const navigate=useNavigate();
    return (
        <div className="login">
            <div className="login__container">
            <div className="login__text">
                <h1>Welcome to Eduversity!!</h1>
            </div>
            <div><Button onClick={()=>navigate('/student')}>Sign in as Student</Button></div>
            <div><Button onClick={()=>navigate('/faculty')}>Sign in as Faculty</Button></div>
            </div>
        </div>
    )
}

export default Login

