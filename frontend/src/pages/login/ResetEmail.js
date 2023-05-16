import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


export const ResetEmail = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const changePasswordRequest = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/reset-password-request', {
            email: email
        }).then(function (response) {
            if (response.data.status == "0"){
                alert("Please verify your email to reset the password");
            }else if (response.data.status == "2"){
                alert("Missing Email");
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    return(
        <div className="resetEmail">
            <Box display="flex" flexDirection={"column"} maxWidth={400} margin="auto" marginTop={20} marginRight={20} spacing={5} sx={{border: 2, borderRadius: '2%', borderColor: 'grey.500', p:10}}>
                <h1>Forgot Password</h1>
                <TextField sx={{p:1}} id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <Button variant="contained" onClick={changePasswordRequest}>Confirm</Button>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Cancel</Button>
            </Box>
        </div>
    );
};