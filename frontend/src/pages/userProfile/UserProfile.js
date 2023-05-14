import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Tabs, Tab } from '@mui/material';
import { TabPanel } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const UserProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.00);

    const [editStatus, setEditStatus] = useState(true);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    let id = Cookies.get('id');
    const profile = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8080/api/auth/user-profile',{
            params:{
                id: id
            }
        }).then(function (response) {
            console.log(response);
            if (response.data.status == '0'){
                setEmail(response.data.email);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const changePasswordSubmit = (e) => {
        e.preventDefault();
        if (password == confirmPassword){
            
        }else{
            alert("please type in carefully");
        }
    }

    const edit = (e) => {
        e.preventDefault();
        setEditStatus(false);
    }

    const editSubmit = (e) => {
        e.preventDefault();
        setEditStatus(true);
    }

    const addList = (e) => {
        e.preventDefault();

    }

    const enable = (e) => {
        e.preventDefault();

    }

    const disable = (e) => {
        e.preventDefault();

    }

    const deleteRow = (e) => {
        e.preventDefault();

    }

    const show = (e) => {
        e.preventDefault();

    }

    const hide = (e) => {
        e.preventDefault();

    }

    const handleTabs = (e, value) => {
        setValue(value);
    }

    function TabPanel(props){
        const {children, value, index} = props;
        return(<div>{
            value===index && (
                <h1>{children}</h1>
            )
        }</div>);
    }

    function createPhoneData(id, title, brand, stock, price){
        return {id, title, brand, stock, price}
    };

    function createCommentData(id, brand, comment){
        return {id, brand, comment}
    };

    const phoneColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
        { field: 'price', headerName: 'Price', type: 'number', width: 90 }
    ];

    const phoneRows =[
        { id: 1, title: 'testing', brand: 'testing', stock: 2, price: 35 }
    ];

    const commentColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        { field: 'comment', headerName: 'Comment', width: 300 },
    ];

    const commentRows =[
        { id: 1, brand: 'testing', comment: 'testing'}
    ];

    return(
        <div className="userProfile">
            <Tabs value={value} onChange={handleTabs} textColor="secondary" indicatorColor="secondary">
                <Tab label="User Profile" onClick={profile} />
                <Tab label="Change Password" />
                <Tab label="Listings" />
                <Tab label="Comments" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TextField sx={{ p: 1 }} id="email" label="email" defaultValue={email} InputProps={{readOnly: editStatus,}} variant="standard"/>
                <TextField sx={{ p: 1 }} id="firstname" label="firstname" defaultValue={firstname} InputProps={{readOnly: editStatus,}} variant="standard"/>
                <TextField sx={{ p: 1 }} id="lastname" label="lastname" defaultValue={lastname} InputProps={{readOnly: editStatus,}} variant="standard"/>
                <Button variant="contained" onClick={edit}>Edit</Button>
                <Button variant="contained" onClick={editSubmit}>Submit</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TextField sx={{ p: 1 }} id="password" label="password" defaultValue={password} variant="standard"/>
                <TextField sx={{ p: 1 }} id="confirmPassword" label="confirmPassword" defaultValue={confirmPassword} variant="standard"/>
                <Button variant="contained" onClick={changePasswordSubmit}>Submit</Button>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TextField sx={{ p: 1 }} id="title" label="title" variant="standard" type="title" value={title} onChange={(e) => setTitle(e.target.value)}/> 
                <TextField sx={{ p: 1 }} id="brand" label="brand" variant="standard" type="brand" value={brand} onChange={(e) => setBrand(e.target.value)}/> 
                <TextField sx={{ p: 1 }} id="stock" label="stock" variant="standard" type="stock" value={stock} onChange={(e) => setStock(e.target.value)}/> 
                <TextField sx={{ p: 1 }} id="price" label="price" variant="standard" type="price" value={price} onChange={(e) => setPrice(e.target.value)}/> 
                <Button variant="contained" onClick={addList}>add</Button>
                <div style={{ height: 400, width: '50%', margin: 'auto'}}>
                    <DataGrid rows={phoneRows} columns={phoneColumns} initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 },},}} pageSizeOptions={[5, 10]} checkboxSelection/>
                    <Button variant="contained" onClick={enable}>Disable</Button>
                    <Button variant="contained" onClick={disable}>Enable</Button>
                    <Button variant="contained" onClick={deleteRow}>Delete</Button>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div style={{ height: 400, width: '80%', margin: 'auto'}}>
                    <DataGrid rows={commentRows} columns={commentColumns} initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 },},}} pageSizeOptions={[5, 10]} checkboxSelection/>
                    <Button variant="contained" onClick={show}>Show</Button>
                    <Button variant="contained" onClick={hide}>Hide</Button>
                </div>
            </TabPanel>
        </div>
    );
};