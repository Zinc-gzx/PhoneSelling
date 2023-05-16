import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import {useSearchParams} from 'react-router-dom';
import PasswordCheckList from "react-password-checklist";


export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [passValid, setPassValid] = useState(false);

    let token = searchParams.get("token");
    token = encodeURIComponent(token);
    const changePassword = (e) => {
        if (passValid){
            if (password == confirmPassword){
                axios.post('http://localhost:8080/api/auth/reset-password', {
                    token: token,
                    password: password
                }).then(function (response) {
                    if(response.data.status == "0"){
                        alert("You have successfully reset your password!");
                        navigate('/login');
                    }
                }).catch(function (error) {
                    alert(error.response.data.message);
                });
            }else{
                alert("Please type in carefully");
            }
        }else{
            alert("Please ensure your password has 8 character length, one uppercase and one symbol");
        }
        
        
    }

    

    return(
        <div className="resetPassword">
            <Box display="flex" flexDirection={"column"} maxWidth={400} margin="auto" marginTop={20} marginRight={20} spacing={5} sx={{border: 2, borderRadius: '2%', borderColor: 'grey.500', p:10}}>
                <h1>Reset Password</h1>
                <TextField sx={{p:1}} label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <TextField sx={{p:1}} label="confirm password" variant="outlined" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> 
                <PasswordCheckList rules={["minLength", 'specialChar', "capital", "match"]} minLength={8} value={password} valueAgain={confirmPassword} onChange={(isValid) => {setPassValid(isValid)}}/>
                <Button variant="contained" onClick={changePassword}>Confirm</Button>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Cancel</Button>
            </Box>
        </div>
        );        
    

};