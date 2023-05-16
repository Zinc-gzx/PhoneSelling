import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, TextField } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cartArr, catArrWithBasePrice } from "./store";
import { useRecoilState } from "recoil";


export const Checkout = () => {
  const [phoneData, setPhoneData] = useRecoilState(cartArr);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();


  const totalPrice = phoneData.reduce((sum, phone) => {
    return sum + parseFloat(phone.price)
  }, 0);

  const handleRemove = (index) => {
    const newPhoneData = [...phoneData];
    newPhoneData.splice(index, 1);
    setPhoneData(newPhoneData);
  };


  const quantityChange = (index, change) => {
    const newPhoneData = [...phoneData];
    const newQuantity = newPhoneData[index].quantity + change;
    const maxStock = newPhoneData[index].stock || Infinity; // Default to Infinity if stock is not provided

    if (newQuantity < 1 || newQuantity > maxStock) return; // Do not allow quantity to go below 1 or above stock

    const updatedPhone = { ...newPhoneData[index], quantity: newQuantity };

    updatedPhone.price = (parseFloat(updatedPhone.basePrice) * newQuantity).toFixed(2);

    newPhoneData[index] = updatedPhone;
    setPhoneData(newPhoneData);
  };

  const quantityInputChange = (index, event) => {
    const newQuantity = parseInt(event.target.value);
    const newPhoneData = [...phoneData];
    const maxStock = newPhoneData[index].stock || Infinity; // Default to Infinity if stock is not provided

    if (isNaN(newQuantity) || newQuantity < 1) {
      if (newQuantity === 0) {
        handleRemove(index);
      }
      return;
    }

    if (newQuantity > maxStock) return;
    // console.log('input', newQuantity)
    const updatedPhone = { ...newPhoneData[index], quantity: newQuantity };

    updatedPhone.price = (parseFloat(updatedPhone.basePrice) * newQuantity).toFixed(2);

    newPhoneData[index] = updatedPhone;
    setPhoneData(newPhoneData);
  };

  const handlePay = (e) => {
    e.preventDefault();
    // Push to back end
    axios.post('http://localhost:8080/api/home/checkout', {
      // stocks:stock,
      phone: phoneData,
    }).then(function (response) {
      if (response.data.code === 200) {
        alert('Your payment is successful!');
      }
      navigate('/');
      setPhoneData([]);
    }).catch(function (error) {
      alert(error.response.data.message);
    });
  };

  

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100vh',
        padding: '10px',
      }}
    >
   
        <Button variant="contained" color="primary" onClick={()=>navigate('/')}>
          Back
        </Button>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ marginTop: '10px' }}
      >
        {phoneData.map((phone, index) => (
          <Grid container item xs={12} key={index} direction="row">
            <Grid item xs>
              <Typography variant="body1">{phone.title}</Typography>
            </Grid>
            <Grid item xs>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={() => quantityChange(index, -1)}>-</Button>
                <TextField
                  variant="outlined"
                  value={phone.quantity}
                  onChange={(event) => quantityInputChange(index, event)}
                  inputProps={{ style: { textAlign: 'center' } }}
                  sx={{ mx: 3, width: '50px' }}
                />
                <Button variant="contained" onClick={() => quantityChange(index, 1)}>+</Button>
              </Box>
            </Grid>
            <Grid item xs>
              <Typography variant="body1">Price: {phone.price}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={() => handleRemove(index)}>Remove</Button>
            </Grid>
          </Grid>

        ))}
        <Grid container item xs={12} direction="row">
          <Grid container justifyContent="flex-end">
            <Grid item xs={5}>
              <Typography variant="body1">$Total: {totalPrice.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Link to='/'>
            <Button variant="contained" color="success" onClick={(e) => handlePay(e)}>Submit Order</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};