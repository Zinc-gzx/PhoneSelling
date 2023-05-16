import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "../components/SearchBar";
import { ItemState } from "../components/ItemState";
import Grid from '@mui/material/Grid';
import { useRecoilState } from "recoil";
import { cartArr,catArrWithBasePrice } from "./store";


export const Home = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [brand, setBrand] = useState({ list: [] });
    const [soldOut, setsSoldOut] = useState([]);
    const [best, setBest] = useState([]);
    // const [cartArray, setCartArray] = useState([]);
    const [cartArray, setCartArray] = useRecoilState(catArrWithBasePrice);// state management code 

    // Get response, all phone data,  from backend
    useEffect(() => {
        axios.get('http://localhost:8080/api/home/home', {
        }).then(function (response) {
            const temp = response;
            const temp2 = temp.data;

            setData(temp2.data.list);
            setBrand(temp2.data.brands);
            setsSoldOut(temp2.data.listSoldOut);
            setBest(temp2.data.listBest);

        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }, []);

    const handleClick = () => {
        const checkoutData = cartArray; // get cart data
        navigate("/checkout", { state: checkoutData });
    };

    useEffect(() => {
        console.log(cartArray);
    }, [cartArray]);

    return (
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
                <SearchBar cartArray={cartArray} setCartArray={setCartArray} />
            </Grid>
            <Grid item style={{ marginRight: '80px', position: 'fixed', top: '50px', right: '20px' }}>

                <Button onClick={handleClick} variant="contained" size='small'>Checkout</Button>

            </Grid>

            <Grid item xs={12} container justifyContent="flex-start" alignItems="flex-start" style={{marginLeft:'30px'}}>
                <h2>Sold Out Soon:</h2>
            </Grid>
            <Grid item xs={12}>
                    <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={soldOut} />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start" alignItems="flex-start" style={{marginLeft:'30px'}}>
                <h2>Best Seller:</h2>
            </Grid>
            <Grid item xs={12}>
                <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={best} />
            </Grid>
        </Grid>
    );

};

