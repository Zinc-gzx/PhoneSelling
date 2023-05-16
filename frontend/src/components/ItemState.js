import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { ReviewHide } from "./reviewHide";
  

export const ItemState = ({cartArray, setCartArray, phoneList, BestorSold}) =>{
    const [openDialogId, setOpenDialogId] = useState(null);
    const [reviewList, setReviewList] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [quantities, setQuantities] = useState({});

    const cookieChecker = Cookies.get('id');
    const isSignedIn = cookieChecker !== undefined && cookieChecker !== '{}';

    const handleClickOpen = (id) => {
     setOpenDialogId(id);
     const temList = phoneList.filter(i => i._id === id);
     setReviewList(temList);
    };
   
    const handleClose = () => {
     setOpenDialogId(null);
    };
   

      const addToCart = (id) => {
        const temList = phoneList.filter(i => i._id === id);
        const inputNumStr = prompt("Enter quantity: ");
    
        if (inputNumStr === null) {
            return;  // User clicked Cancel, so do nothing
        }
    
        // Check if the string is a valid number (integer or decimal)
        if (!/^\d+(\.\d+)?$/.test(inputNumStr)) {
            alert("You should input a valid number for quantity");
            return;
        }
    
        const inputQuantity = parseFloat(inputNumStr);
    
        if (inputQuantity <= 0) {
            alert("You should input a positive number");
        } else if (!Number.isInteger(inputQuantity)) {
            alert("You should input an integer number");
        } else if (temList[0].stock < inputQuantity) {
            alert("No enough stock!");
        } else {
            const existingItemIndex = cartArray.findIndex(item => item._id === id);
    
            if (existingItemIndex >= 0) {
                // Update the quantity of the existing item
                const newCartArray = cartArray.map((item, index) => {
                    if (index !== existingItemIndex) {
                        return item;
                    }
                    return {
                        ...item,
                        quantity: item.quantity + inputQuantity,
                    };
                });
                setCartArray(newCartArray);
            } else {
                // Add the item to the cart as a new item
                temList[0].quantity = inputQuantity;
                setQuantities({
                    ...quantities,
                    [id]: inputQuantity,  // Update quantity for this item
                });
                setCartArray([...cartArray, ...temList]);
            }
        }
    };

    const submitComment = (e, id) => {
        e.preventDefault();
        // Push to back end
        axios.post('http://localhost:8080/api/home/comment', {
            reviewers: cookieChecker,
            comments:comment,
            ratings:rating,
            phoneID: id
        }).then(function (response) {
        }).catch(function (error) {
            alert(error.response.data.message);
        });
        // Reset comment and rating
        setComment("");
        setRating(0);
    };


     return (
     <div>
     <div className="image-container" style={{ display: 'flex' }}>
     {phoneList.map((i)=> (
       <div key={i._id} >
        <img  alt="phone" style={{height: "100px", width: "100px" }} onClick={() => handleClickOpen(i._id)} src={`/${i.image}`}/>
        <Dialog open={openDialogId === i._id} onClose={handleClose}>
         <DialogTitle>Detail of Phone</DialogTitle>
         <DialogContent>
          <div>
          {isSignedIn ? 
                <>
                
                <div>
                <div>Current quantity: {quantities[i._id] || 0}</div>
                <Button variant="contained" onClick={() => addToCart(i._id)}>
                    Add to Cart
                </Button>
                </div>
                </>
                : 
                <>
                    <Link to={"/login"}>
                    <Button variant="contained">
                    Add to Cart
                    </Button>
                    </Link>
                </>
            }
            </div>
          <p>Title: {i.title}</p >
          <p>Brand: {i.brand}</p >
          < img alt="phone" src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
          <p>Stock: {i.stock}</p >
          <p>Seller: {i.seller ? i.seller.firstname : 'Unknown'} {i.seller ? i.seller.lastname : ''}</p >

          <p>Price: {i.price}</p >
         <div>
         
            <ReviewHide reviewList={reviewList}/>
          <div>


          {isSignedIn ? 
                <>
                
                    {/* if Sign In, show submitComment */}
                   <div>
                        <TextField
                            label="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                            setRating(newValue);
                            }}
                        />
                        <Button variant="contained" onClick={(e) => submitComment(e, i._id)}>
                            Submit Comment
                        </Button>
                    </div>
                </>
                : 
                <>
                    <p>Please sign in to leave a review.</p>
                </>
            }

            
            </div>
         </div>
         </DialogContent>
        </Dialog>
        
        {i.stock > 0 && (
        <>
            <br />
            {BestorSold === 0 ? 
                <>
                    <div>{i.title}</div>
                    <div style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
                        ${i.price}
                    </div> 
                </>
                : 
                <>
                
                    <div>{i.title}</div>
                    <div style={{ fontSize: "20px", color: "gold", padding: "0 20px" }}>
                       Average Rating: {i.average} 
                    </div>
                </>
            }    
            <br />
        </>
        )}
       </div>
      ))}
     </div>
     </div>
  
   )}