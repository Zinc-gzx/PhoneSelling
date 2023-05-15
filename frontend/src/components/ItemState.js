import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
  

export const ItemState = ({cartArray, setCartArray, phoneList, BestorSold}) =>{
    const [openDialogId, setOpenDialogId] = useState(null);
    const [reviewList, setReviewList] = useState([]);
    const [isExpanded, setIsExpanded] = useState({});
    const [numDisplayed, setNumDisplayed] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [hiddenComment, setHiddenComment] = useState(false);

    const handleHidden = (id) => {
        const temList = phoneList.filter(i => i._id === id);
        setHiddenComment(!hiddenComment);
    };

    const commentStyle = {
        color: hiddenComment ? 'grey' : 'black'
    };

    const cookieChecker = Cookies.get('id');
    const isSignedIn = cookieChecker !== undefined && cookieChecker !== '{}';

    //console.log("Cookie in ItemState:" , Cookies.get('id'))
  
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
            const inputQuantity = parseInt(prompt("Enter quantity: "), 10);
            if (!isNaN(inputQuantity) && inputQuantity > 0 && temList[0].stock >= inputQuantity) {
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
                        [id]: inputQuantity,  // Update quantity for this item
                    });
                    setCartArray([...cartArray, ...temList]);
                }
            } else {
                alert("No enough stock ! ");
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
            console.log(response);
        }).catch(function (error) {
            alert(error.response.data.message);
        });
        // Reset comment and rating
        setComment("");
        setRating(0);
    };


    // const test = () => {
    //     reviewList.map((item, index) => {
    //         //console.log("item", item)
    //         item.reviews.map(review => {
    //             if (Object.keys(review).length < 4) {
    //                 console.log("false")
    //               }
    //             //console.log("review: ", review)
    //         })
    //     })
    // }
    
    //test()
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
          {isSignedIn && (
            <div>
            <div>Current quantity: {quantities[i._id] || 0}</div>
            <Button variant="contained" onClick={() => addToCart(i._id)}>
                Add to Cart
            </Button>
            </div>
            )}

            {/* <Button variant="contained" onClick={() => addToCart(i._id)}>
                Add to Cart
            </Button> */}
            </div>
          <p>Title: {i.title}</p >
          <p>Brand: {i.brand}</p >
          < img alt="phone" src={`/${i.image}`} style={{ height: "100px", width: "100px" }}/>
          <p>Stock: {i.stock}</p >
          {/* <p>Seller: {i.seller.firstname} {i.seller.lastname}</p > */}
          <p>Seller: {i.seller ? i.seller.firstname : 'Unknown'} {i.seller ? i.seller.lastname : ''}</p >

          <p>Price: {i.price}</p >
         <div>
         

          <div>
          <Button variant="contained" onClick={() => handleShowMoreReviews(i._id)}>Show More Reviews</Button>
          </div>
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
                    <span>{i.title}</span>
                    <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
                        ${i.price}
                    </span> 
                </>
                : 
                <>
                    <span>{i.title}</span>
                    <span style={{ fontSize: "20px", color: "red", padding: "0 20px" }}>
                        {i.average}
                    </span>
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