import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "../components/SearchBar";
import { ItemState } from "../components/ItemState";



export const Home = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [brand, setBrand] = useState({ list: [] });
    const [soldOut, setsSoldOut] = useState([]);
    const [best, setBest] = useState([]);
    const [cartArray, setCartArray] = useState([]);

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
        const checkoutData = cartArray; // 这是你要传递的数据
        navigate("/checkout", { state: checkoutData }); // 跳转到Detail组件，并传递数据
    };

    useEffect(() => {
        console.log(cartArray);
    }, [cartArray]);

    return (
        <div>
            <div>
                <Button onClick={handleClick} color="inherit">Checkout</Button>
                <SearchBar cartArray={cartArray} setCartArray={setCartArray} />
                <ShoppingCartIcon /><p>Current Quantity: </p>
                <Button color="inherit">Login</Button>
            </div>
            <div>
                <h2>Sold Out Soon: </h2>
            </div>
            <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={soldOut} />
            <div>
                <h2>Best Seller: </h2>
            </div>
            <ItemState cartArray={cartArray} setCartArray={setCartArray} phoneList={best} />

        </div>


    );

};

