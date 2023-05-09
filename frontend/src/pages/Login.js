import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/sign-in', {
            username: username,
            password: password
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }
    return(
        <div className="login">
            <label for="username">username</label>
            <input type="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <label for="password">password</label>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
            <button onClick={signIn}>Login</button>
            <Link to="/reset">Forgot your password?</Link>
            <button onClick={() => {navigate("/setup")}}>Setup</button>
        </div>
    );
};