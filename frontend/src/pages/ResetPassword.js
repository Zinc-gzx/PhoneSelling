import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import {useSearchParams} from 'react-router-dom';


export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    let token = searchParams.get("token");
    token = encodeURIComponent(token);
    const changePassword = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/reset-password', {
            token: token,
            password: password
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    return(
        <div className="resetPassword">
            <Box display="flex" flexDirection={"column"} maxWidth={500} alignItems="center" margin="auto" marginTop={30} marginRight={20} border>
                <TextField id="outlined-basic" label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <Button variant="contained" onClick={changePassword}>Confirm</Button>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Cancel</Button>
            </Box>
        </div>
        );        
    

};