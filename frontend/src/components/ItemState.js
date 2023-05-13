import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import axios from 'axios';


export const ItemState = ({cartArray, setCartArray, phoneList}) =>{
    const [openDialogId, setOpenDialogId] = useState(null);
    const [reviewList, setReviewList] = useState([]);
  
    const handleClickOpen = (id) => {
     setOpenDialogId(id);
     const temList = phoneList.filter(i => i._id === id);
     setReviewList(temList);
    };
   
    const handleClose = () => {
     setOpenDialogId(null);
    };
   
    const [isExpanded, setIsExpanded] = useState(false);
    const handleShowMore = () => {
     setIsExpanded(true);
    };
   
    const [numDisplayed, setNumDisplayed] = useState(3);
   
    const handleShowMoreReviews = () => {
     setNumDisplayed(numDisplayed + 3);
     };

    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    
    const addToCart = (id) => {
        const temList = phoneList.filter(i => i._id === id);
        console.log(temList[0].stock);
        const inputQuantity = parseInt(prompt("Enter quantity: "), 10);
        if (!isNaN(inputQuantity) && inputQuantity > 0 && temList[0].stock >= inputQuantity) {
            temList[0].quantity = inputQuantity;
            // console.log("temmmmmmmm: ", temList[0]);
            // console.log("tempList: ", temp);
            setQuantity(inputQuantity);
        }else{
            alert("No enough stock ! ");
        }
        // const temp = {
        //     ...temList[0],
        //     quantity: inputQuantity, // 添加 quantity 属性
        // };
        // Global Variable for the cart array
        setCartArray([...cartArray, temList]);
        //console.log(cartArray);
    };

    const submitComment = (e, id) => {
        e.preventDefault();
        // Push to back end
        axios.post('http://localhost:8080/api/home/comment', {
            reviewers: "Zinc",
            comments:comment,
            ratings:rating,
            phoneID: id
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
        console.log(`Comment: ${comment}`);
        console.log(`Rating: ${rating}`);
        console.log(`phoneID: ${id}`);
        // Reset comment and rating
        setComment("");
        setRating(0);
    };

    // useEffect(() => {
    //     console.log(cartArray);
    //   }, [cartArray]);
  
     return (
     <div>
     <div className="image-container">
     {phoneList.map((i)=> (
       <div key={i._id}>
        <img onClick={() => handleClickOpen(i._id)} src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
        <Dialog open={openDialogId === i._id} onClose={handleClose}>
         <DialogTitle>Detail of Phone</DialogTitle>
         <DialogContent>
          <div>Current quantity: {quantity}</div>
          <div>
            <Button variant="contained" onClick={() => addToCart(i._id)}>
                Add to Cart
            </Button>
            </div>
          <p>Title: {i.title}</p >
          <p>Brand: {i.brand}</p >
          < img src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
          <p>Stock: {i.stock}</p >
          <p>Seller: {i.seller.firstname} {i.seller.lastname}</p >
          <p>Price: {i.price}</p >
         <div>
          {reviewList.map((item, index) => (
           item.reviews.slice(0, numDisplayed).map((review, i) => (
            <div key={i}>
             <p>Reviewer: {review.reviewer.firstname} {review.reviewer.lastname}</p >
             <p>Rating: {review.rating}</p >
             <div>
              
              <p>
               {isExpanded ? review.comment : review.comment.substring(0, 200)}
              </p >{review.comment.length > 200 && !isExpanded && (
               <Button variant="contained" onClick={handleShowMore}>Show More</Button>
              )}
             </div>
            </div>
           ))
          ))}
          <div>
          <Button variant="contained" onClick={handleShowMoreReviews}>Show More Reviews</Button>
          </div>
          <div>

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
            </div>
         </div>
         </DialogContent>
        </Dialog>
        <br />
        <span>title: {i.title}</span>
        <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
         price: {i.price}
        </span>
        <br />
       </div>
      ))}
     </div>
     </div>
  
   )}