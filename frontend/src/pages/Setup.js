import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

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
        <> 
        <label for="email">email</label>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
        <label for="password">password</label>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
        <label for="firstname">firstname</label>
        <input type="firstname" placeholder="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/> 
        <label for="lastname">lastname</label>
        <input type="lastname" placeholder="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/> 
        <button onClick={setUp}>Submit</button>
        <Link to="/">Have a account? Log in now!</Link>
        </>

    );
};