import React, { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';

export const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    let token = searchParams.get("token");
    useEffect(() => {
        axios.get('http://localhost:8080/api/auth/verify', {
            params:{
                token: token
            }
        }).then(function (response) {
            console.log(response);
            if (response.data.status == "0"){
                setStatus(response.data.status);
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    })
    if (status == "0"){
        return(
            <>Congraduation! You have successfully activated your account. You can login now!</>
        );
    }else{
        return(
            <>Link is incorrect or has expired</>
        );
    }
    
    
};