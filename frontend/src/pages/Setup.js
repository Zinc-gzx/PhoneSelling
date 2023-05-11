import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export const Setup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const setUp = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/sign-up', {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    return(
        <div className="setup"> 
            <Box display="flex" flexDirection={"column"} maxWidth={400} margin="auto" marginTop={10} marginRight={20} spacing={5} sx={{border: 2, borderRadius: '2%', borderColor: 'grey.500', p:10}}>
                <h1>Setup</h1>
                <TextField sx={{p:1}} id="outlined-basic" label="email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <TextField sx={{p:1}} id="outlined-basic" label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <TextField sx={{p:1}} id="outlined-basic" label="firstname" variant="outlined" type="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/> 
                <TextField sx={{p:1}} id="outlined-basic" label="lastname" variant="outlined"type="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/> 
                <Button variant="contained" onClick={setUp}>Submit</Button>
                <Link sx={{p:1}} href="/login" underline="hover">{'Have a account? Log in now!'}</Link>
            </Box>
        </div>

    );
};