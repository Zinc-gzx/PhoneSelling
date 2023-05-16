import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import PasswordCheckList from "react-password-checklist";


export const Setup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [passValid, setPassValid] = useState(false);

    const setUp = (e) => {
        if (passValid){
            axios.post('http://localhost:8080/api/auth/sign-up', {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
            }).then(function (response) {
                if (response.data.status == "0"){
                    alert('You have successfully setup please verify your email');
                }else if (response.data.status == "2"){
                    alert('Missing email, password, firstname, or lastname');
                }
            }).catch(function (error) {
                alert(error.response.data.message);
            });
        }else{
            alert("Please ensure your password has 8 character length, one uppercase and one symbol");
        }
        
    }

    return(
        <div className="setup"> 
            <Box display="flex" flexDirection={"column"} maxWidth={400} margin="auto" marginTop={10} marginRight={20} spacing={5} sx={{border: 2, borderRadius: '2%', borderColor: 'grey.500', p:10}}>
                <h1>Setup</h1>
                <TextField sx={{p:1}} label="email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <TextField sx={{p:1}} label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                <PasswordCheckList rules={["minLength", 'specialChar', "capital"]} minLength={8} value={password} onChange={(isValid) => {setPassValid(isValid)}}/>
                <TextField sx={{p:1}} label="firstname" variant="outlined" type="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/> 
                <TextField sx={{p:1}} label="lastname" variant="outlined"type="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/> 
                <Button variant="contained" onClick={setUp}>Submit</Button>
                <Link sx={{p:1}} href="/login" underline="hover">{'Have a account? Log in now!'}</Link>
            </Box>
        </div>

    );
};