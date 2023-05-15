import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "../components/SearchBar";
import { ItemState } from "../components/ItemState";
import Grid from '@mui/material/Grid';
import Cookies from 'js-cookie';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useRecoilState } from "recoil";
import { cartArr,catArrWithBasePrice } from "./store";


export const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [brand, setBrand] = useState({ list: [] });
    const [soldOut, setsSoldOut] = useState([]);
    const [best, setBest] = useState([]);
    //const [cartArray, setCartArray] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(Cookies.get('id') !== undefined && Cookies.get('id') !== '{}');
    //const [isSignedIn, setIsSignedIn] = useState(false);
    //console.log("Cookie:" , Cookies.get('id'))
    //console.log("Cookie Remove:", Cookies.remove('id'))
    // const cookieChecker = Cookies.get('id');
    // let isSignedIn = cookieChecker !== undefined && cookieChecker !== '{}';
    // //setIsSignedIn(cookieStatus);
    // console.log("isSignedIn:" , isSignedIn);
    //console.log("Cookie Remove:", Cookies.remove('id'))
    // Get response, all phone data,  from backend
    const [cartArray, setCartArray] = useRecoilState(catArrWithBasePrice);
    useEffect(() => {
        axios.get('http://localhost:8080/api/home/home', {
        }).then(function (response) {
            const temp = response;
            const temp2 = temp.data;
            console.log(response)
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

    const handleSignOut = () => {
        Cookies.remove('id');
        setIsSignedIn(false);
        console.log("Handle sign out:", isSignedIn);
    }

    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cartArray));
    // }, [cartArray]);
    

    useEffect(() => {
        console.log("Cart Array:", cartArray);
    }, [cartArray]);
    if (isSignedIn) {
            return (
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <SearchBar cartArray={cartArray} setCartArray={setCartArray} />
                    </Grid>
                    <Grid item style={{ marginRight: '80px', position: 'fixed', top: '50px', right: '20px' }}>
                        <ButtonGroup>
                        <Button onClick={handleSignOut} variant="contained" size='small'>Sign Out</Button>
                        <Button variant="contained" size='small' onClick={() => navigate('/user_profile')}>User Profile</Button>
                        </ButtonGroup>
                        <Button onClick={handleClick} variant="contained" size='small'>Checkout</Button>

                    </Grid>

                    <Grid item xs={12} container justifyContent="flex-start" alignItems="flex-start" style={{marginLeft:'30px'}}>
                        <h2>Sold Out Soon:</h2>
                    </Grid>
                    <Grid item xs={12}>
                            <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={soldOut} BestorSold = {0}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-start" alignItems="flex-start" style={{marginLeft:'30px'}}>
                        <h2>Best Seller:</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={best} BestorSold = {1}/>
                    </Grid>
                </Grid>
            );
    } else {
            return (
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <SearchBar cartArray={cartArray} setCartArray={setCartArray} />
                    </Grid>
                    <Grid item style={{ marginRight: '80px', position: 'fixed', top: '50px', right: '20px' }}>
                        <Link to={'\login'}>
                        <Button variant="contained" size='small'>Sign In</Button>
                        </Link>
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
    }

};

