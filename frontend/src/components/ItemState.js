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
    const [isExpanded, setIsExpanded] = useState({});
    const [numDisplayed, setNumDisplayed] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [quantities, setQuantities] = useState({});

  
    const handleClickOpen = (id) => {
     setOpenDialogId(id);
     const temList = phoneList.filter(i => i._id === id);
     setReviewList(temList);
    };
   
    const handleClose = () => {
     setOpenDialogId(null);
    };
   
    //const [isExpanded, setIsExpanded] = useState(false);
    // const handleShowMore = () => {
    //  setIsExpanded(true);
    // };

    const handleShowMore = (id) => {
        setIsExpanded({
          ...isExpanded,
          [id]: true,
        });
      };
   
    //const [numDisplayed, setNumDisplayed] = useState(3);
   
    // const handleShowMoreReviews = () => {
    //  setNumDisplayed(numDisplayed + 3);
    //  };

    const handleShowMoreReviews = (id) => {
        setNumDisplayed({
          ...numDisplayed,
          [id]: numDisplayed[id] ? numDisplayed[id] + 3 : 3,
        });
      };
    
    const addToCart = (id) => {
        const temList = phoneList.filter(i => i._id === id);
        console.log(temList[0].stock);
        const inputQuantity = parseInt(prompt("Enter quantity: "), 10);
        if (!isNaN(inputQuantity) && inputQuantity > 0 && temList[0].stock >= inputQuantity) {
            temList[0].quantity = inputQuantity;
            // setQuantity(inputQuantity);
            setQuantities({
                ...quantities,
                [id]: inputQuantity,  // Update quantity for this item
            });
        }else{
            alert("No enough stock ! ");
        }

        setCartArray([...cartArray, ...temList]);
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
     <div className="image-container" style={{ display: 'flex' }}>
     {phoneList.map((i)=> (
       <div key={i._id} >
        <img onClick={() => handleClickOpen(i._id)} src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
        <Dialog open={openDialogId === i._id} onClose={handleClose}>
         <DialogTitle>Detail of Phone</DialogTitle>
         <DialogContent>
          {/* <div>Current quantity: {quantity}</div> */}
          <div>Current quantity: {quantities[i._id] || 0}</div>
          <div>
            <Button variant="contained" onClick={() => addToCart(i._id)}>
                Add to Cart
            </Button>
            </div>
          <p>Title: {i.title}</p >
          <p>Brand: {i.brand}</p >
          < img src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
          <p>Stock: {i.stock}</p >
          {/* <p>Seller: {i.seller.firstname} {i.seller.lastname}</p > */}
          <p>Seller: {i.seller ? i.seller.firstname : 'Unknown'} {i.seller ? i.seller.lastname : ''}</p >

          <p>Price: {i.price}</p >
         <div>
          {reviewList.map((item, index) => (
           //item.reviews.slice(0, numDisplayed).map((review, i) => (
            item.reviews.slice(0, numDisplayed[item._id] || 3).map((review, i) => (
            <div key={i}>
             {/* <p>Reviewer: {review.reviewer.firstname} {review.reviewer.lastname}</p > */}
             <p>Reviewer: {review.reviewer ? review.reviewer.firstname : 'Unknown'} {review.reviewer ? review.reviewer.lastname : ''}</p >

             <p>Rating: {review.rating}</p >
             <div>
                {console.log(review)}
                <p>
                    {isExpanded[review.reviewer._id] || !review.comment ? review.comment : review.comment.substring(0, 200)}
                </p >
                {review.comment && review.comment.length > 200 && !isExpanded[review.reviewer._id] && (
                    <Button variant="contained" onClick={() => handleShowMore(review.reviewer._id)}>Show More</Button>
                )}

             </div>
            </div>
           ))
          ))}
          <div>
          <Button variant="contained" onClick={() => handleShowMoreReviews(i._id)}>Show More Reviews</Button>
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
        {/* <br />
        <span>title: {i.title}</span>
        <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
         price: {i.price}
        </span>
        <br /> */}
        {i.stock > 0 && (
        <>
            <br />
            <span>{i.title}</span>
            <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
            ${i.price}
            </span>
            <br />
        </>
        )}
       </div>
      ))}
     </div>
     </div>
  
   )}