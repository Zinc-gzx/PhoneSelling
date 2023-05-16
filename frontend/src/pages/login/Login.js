import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';


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
            if (response.data.status == "0"){
                Cookies.set('id', response.data.id);
                // return(               
                //     <Alert severity="success">This is a success message!</Alert>
                // );
                navigate('/');
            }else if (response.data.status == "1"){
                alert('incorrect email or password');
            }else if (response.data.status == "3"){
                alert('already sign in, please sign out');
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }
    return(
        <div className="login">
            <Box display="flex" flexDirection={"column"} maxWidth={400} margin="auto" marginTop={20} marginRight={20} spacing={5} sx={{border: 2, borderRadius: '2%', borderColor: 'grey.500', p:10}}>
                <h1>Login</h1>
                <TextField sx={{ p: 1 }} id="outlined-basic" label="username" variant="outlined" type="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
                <TextField sx={{ p: 1 }} id="outlined-basic" label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <Button variant="contained" onClick={signIn}>Login</Button>
                <Button variant="contained" onClick={() => {navigate("/setup")}}>Setup</Button>
                <Button variant="contained" onClick={() => {navigate("/")}}>Cancel</Button>
                <Link sx={{ p: 1 }} href="/reset_email" underline="hover">{'Forgot your password?'}</Link>
            </Box>
        </div>
    );
};