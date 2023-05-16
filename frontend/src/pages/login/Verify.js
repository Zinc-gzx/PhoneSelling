import React, { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    let token = searchParams.get("token");
    useEffect(() => {
        axios.get('http://localhost:8080/api/auth/verify', {
            params:{
                token: token
            }
        }).then(function (response) {
            if (response.data.status == "0"){
                setStatus(response.data.status);
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    })
    if (status == "0"){
        return(
            <div className="verify">
                <>Congraduation! You have successfully activated your account. You can login now!</>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Login</Button>
            </div>
        );
    }else{
        return(
            <div className="verifyFailed">
                <>Link is incorrect or has expired</>
                <Button variant="contained" onClick={() => {navigate("/login")}}>Login</Button>
            </div>
        );
    }


    
};