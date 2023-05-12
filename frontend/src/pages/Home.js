import React, { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    //let token = searchParams.get("token");
    useEffect(() => {
        axios.get('http://localhost:8080/api/home/home', {
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    })
        
};