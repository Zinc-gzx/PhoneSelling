import * as React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Tabs, Tab, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import PasswordCheckList from "react-password-checklist";


export const UserProfile = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [passValid, setPassValid] = useState(false);


    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.00);
    const [selectedPhoneRows, setSelectedPhoneRows] = useState([]);
    const [selectedCommentRows, setSelectedCommentRows] = useState([]);

    const [editStatus, setEditStatus] = useState(true);
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    ///todo
    let id = Cookies.get('id');
    const profile = () => {
        axios.get('http://localhost:8080/api/auth/user-profile',{
                params:{
                    id: id
                }
            }).then(function (response) {
                if (response.data.status == '0'){
                    setEmail(response.data.email);
                    setFirstname(response.data.firstname);
                    setLastname(response.data.lastname);
                }
            }).catch(function (error) {
                alert(error.response.data.message);
            });
    }
    
    const edit = (e) => {
        setEditStatus(false);
    }

    const editSubmit = (e) => {
        // e.preventDefault();
        setEditStatus(true);
        axios.post('http://localhost:8080/api/auth/user-profile-edit', {
            id: id,
            email: email,
            firstname: firstname,
            lastname, lastname
        }).then(function (response) {
            if (response.data.status == "0"){
                alert('Your have successfully changed your profile');
            }else if (response.data.status == "1"){
                alert('One of the field is empty');
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }
    //change password
    const changePasswordSubmit = () => {
        if (passValid){
            axios.get('http://localhost:8080/api/auth/check-password', {
                params:{
                    password: password,
                    id: id
                }
            }).then(function (response){
                if (response.data.status == '0'){
                    axios.post('http://localhost:8080/api/auth/reset-password-user-profile', {
                        id: id,
                        password: newPassword
                    }).then(function (response) {
                        if (response.data.status == '0'){
                            alert("You have successfully reset your password, an email has sent to your mail box");
                        }
                    }).catch(function (error) {
                        alert(error.response.data.message);
                    });
                    // setPassValid(false);

                }else if (response.data.status == '1'){
                    alert('Wrong password');
                }else if (response.data.status == '2'){
                    alert('Missing password');
                }
            }).catch(function (error) {
                alert(error.response.data.message);
            });

        }else{
            alert("Please ensure your password has 8 character length, one uppercase and one symbol");

        }
    }

    const phoneColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
        { field: 'price', headerName: 'Price', type: 'number', width: 90 }
    ];

    const [phoneRows, setPhoneRows] = useState(() => [
        // createRow(),
    ]);

    const [commentRows, setCommentRows] = useState(() => [
        // createRow(),
    ]);

    let responsePhoneList = [];

    const listing = (e) => {

        axios.get('http://localhost:8080/api/userProfile/listing',{
            params:{
                id: id
            }
        }).then(function (response) {
            if (response.data.status == '0'){
                response.data.phones.map((phone, index) => {
                    responsePhoneList.push({
                        id: index+1,
                        title: phone.title,
                        brand: phone.brand,
                        stock: phone.stock,
                        price: phone.price,
                        phone_id: phone._id
                    });
                });
                setPhoneRows(responsePhoneList);
            }else{
                alert('Internal Error');
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const commentColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'reviewer', headerName: 'Reviewer', width: 150 },
        { field: 'rating', headerName: 'Rating', width: 70 },
        { field: 'comment', headerName: 'Comment', width: 500 },
    ];

    let responseCommentList = [];

    const comment = (e) => {
        axios.get('http://localhost:8080/api/userProfile/listing',{
            params:{
                id: id
            }
        }).then(function (response) {
            if (response.data.status == '0'){
                response.data.phones.map((phone, index) => {
                    let amount = 0;
                    phone.reviews.map((review, index) => {
                        responseCommentList.push({
                            id: index+1,
                            reviewer: review.reviewer,
                            rating: review.rating,
                            comment: review.comment,
                            phone_id: phone._id,
                            amount: amount
                        });
                        amount+=1;
                    })
                    
                });
                setCommentRows(responseCommentList);
            }else{
                alert('Internal Error');
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const handleAddRow = () => {
        axios.post('http://localhost:8080/api/userProfile/add-phone', {
            id: id,
            title: title,
            brand: brand,
            stock: stock,
            price: price
        }).then(function (response) {
            if (response.data.status == "0"){
                let newRow = {
                    id: phoneRows.length+1, title: title, brand: brand, stock: stock, price: price, phone_id: response.data.phones._id
                }
                setPhoneRows((prevRows) => [...prevRows, newRow]);
            }else if (response.data.status == "1"){
                alert('Missing field');
            }else if (response.data.status == "2"){
                alert('Please enter a number for stock and price');
            }else if (response.data.status == "3"){
                alert('Please enter a valid number for stock and price')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });


    };


    const handleDeleteRow = () => {
        axios.post('http://localhost:8080/api/userProfile/delete-phone',{
            _id: selectedPhoneRows[0].phone_id
        }).then(function (response) {
            if (response.data.status == '0'){
                const remainingRows = phoneRows.filter(
                    (row) => !selectedPhoneRows.find((selectedPhoneRow) => selectedPhoneRow.id === row.id)
                );
                setPhoneRows(remainingRows);
                setSelectedPhoneRows([]);
            }else{
                alert('Internal Error')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });

        
    };

    
    const enable = (e) => {
        axios.post('http://localhost:8080/api/userProfile/enable-phone',{
            _id: selectedPhoneRows[0].phone_id
        }).then(function (response) {
            if (response.data.status == '0'){
                alert('You have successfully enable the phone');
            }else{
                alert('Internal Error')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });    }

    const disable = (e) => {
        axios.post('http://localhost:8080/api/userProfile/disable-phone',{
            _id: selectedPhoneRows[0].phone_id
        }).then(function (response) {
            if (response.data.status == '0'){
                alert('You have successfully disable the phone');
            }else{
                alert('Internal Error')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const show = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/home/hide',{
            reviewers: selectedCommentRows[0].reviewer,
            phoneID: selectedCommentRows[0].phone_id,
            commentHide: false,

        }).then(function (response) {
            if (response.data.status == '0'){
                alert('You have successfully show the comment')
            }else{
                alert('Internal Error')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const hide = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/home/hide',{
            _id: selectedCommentRows[0].phone_id,
            reviewers: selectedCommentRows[0].reviewer,
            phoneID: selectedCommentRows[0].phone_id,
            commentHide: true,
        }).then(function (response) {
            if (response.data.status == '0'){
                alert('You have successfully hide the comment');
            }else{
                alert('Internal Error')
            }
        }).catch(function (error) {
            alert(error.response.data.message);
        });
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const signout = () => {
        let result = window.confirm('Do you want to sign out?');
        if (result) {
            navigate('/');
            Cookies.remove('id');
        }
    }
    

    return(
        <div className="userProfile">
            <Button sx={{display: 'flex', justifyContent: 'flex-start'}} variant="contained" onClick={signout}>Signout</Button>
            <Button sx={{display: 'flex', justifyContent: 'flex-start'}} variant="contained" onClick={() => navigate('/')}>Back</Button>
            <Tabs value={tabValue} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary">
                <Tab label="Change Password" />
                <Tab label="User Profile" onClick={profile}/>
                <Tab label="Listings" onClick={listing} />
                <Tab label="Comments" onClick={comment}/>
            </Tabs>

            {tabValue === 1 && (
                <div>
                    <TextField sx={{ p: 1 }} id="email" type='email' label="email" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{readOnly: editStatus,}} variant="standard"  />
                    <TextField sx={{ p: 1 }} id="firstname" label="firstname"  InputProps={{readOnly: editStatus,}} variant="standard" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    <TextField sx={{ p: 1 }} id="lastname" label="lastname"  InputProps={{readOnly: editStatus,}} variant="standard"  value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    <Button variant="contained" onClick={edit}>Edit</Button>
                    <Button variant="contained" onClick={editSubmit}>Submit</Button>
                </div>
            )}

            {tabValue === 0 && (
                <div>
                    <TextField sx={{ p: 1 }} type="password" id="password" label="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="standard"/>
                    <TextField sx={{ p: 1 }} type="password" id="newPassword" label="new password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} variant="standard"/>
                    <PasswordCheckList rules={["minLength", 'specialChar', "capital"]} minLength={8} value={newPassword} onChange={(isValid) => {setPassValid(isValid)}}/>
                    <Button variant="contained" onClick={changePasswordSubmit}>Submit</Button>
                </div>
            )}

            {tabValue === 2 && (
                <div>
                    <TextField sx={{ p: 1 }} id="title" label="title" variant="standard" type="title" value={title} onChange={(e) => setTitle(e.target.value)}/> 
                    <TextField sx={{ p: 1 }} id="brand" label="brand" variant="standard" type="brand" value={brand} onChange={(e) => setBrand(e.target.value)}/> 
                    <TextField sx={{ p: 1 }} id="stock" label="stock" variant="standard" type="stock" value={stock} onChange={(e) => setStock(e.target.value)}/> 
                    <TextField sx={{ p: 1 }} id="price" label="price" variant="standard" type="price" value={price} onChange={(e) => setPrice(e.target.value)}/> 
                    <Button variant="contained" onClick={handleAddRow}>add</Button>

                    <div style={{ height: 400, width: '50%', margin: 'auto'}}>
                        
                        <DataGrid rows={phoneRows} columns={phoneColumns} 
                            onRowSelectionModelChange={(ids) => {
                                const selectedPhoneIDs = new Set(ids);
                                const selectedPhoneRows = phoneRows.filter((row) =>
                                    selectedPhoneIDs.has(row.id),
                                );
                                setSelectedPhoneRows(selectedPhoneRows);
                            }} 
                            
                            />   
                        <Button variant="contained" onClick={disable}>Disable</Button>
                        <Button variant="contained" onClick={enable}>Enable</Button>
                        <Button variant="contained" onClick={handleDeleteRow}>Delete</Button>

                    </div>
                </div>            
            )}
            {tabValue === 3 && (
                <div style={{ height: 400, width: '80%', margin: 'auto'}}>
                    <DataGrid rows={commentRows} columns={commentColumns} initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 },},}} pageSizeOptions={[5, 10]} onRowSelectionModelChange={(ids) => {
                            const selectedCommentIDs = new Set(ids);
                            const selectedCommentRows = commentRows.filter((row) =>
                                selectedCommentIDs.has(row.id),
                            );
                            setSelectedCommentRows(selectedCommentRows);
                        }} />
                    <Button variant="contained" onClick={show}>Show</Button>
                    <Button variant="contained" onClick={hide}>Hide</Button>
                </div>
            )}
        </div>
    );
};