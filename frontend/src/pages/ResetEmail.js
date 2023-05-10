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
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    return(
        <div className="resetEmail">
            <Box display="flex" flexDirection={"column"} maxWidth={500} alignItems="center" margin="auto" marginTop={30} marginRight={20} border>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <Button variant="contained" onClick={changePasswordRequest}>Confirm</Button>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Cancel</Button>
            </Box>
        </div>
    );
};