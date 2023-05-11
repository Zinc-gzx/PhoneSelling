import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/sign-in', {
            email: username,
            password: password
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }
    return(
        <div className="login">
            <Box display="flex" flexDirection={"column"} maxWidth={500} alignItems="center" margin="auto" marginTop={30} marginRight={20} border>
                <TextField id="outlined-basic" label="username" variant="outlined" type="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
                <TextField id="outlined-basic" label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <Button variant="contained" onClick={signIn}>Login</Button>
                <Link href="/reset_email" underline="hover">{'Forgot your password?'}</Link>
                <Button variant="contained" onClick={() => {navigate("/setup")}}>Setup</Button>
            </Box>
        </div>
    );
};