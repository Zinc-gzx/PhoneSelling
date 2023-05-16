import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'js-cookie';


export const ReviewHide = ({reviewList}) =>{
    const [isExpanded, setIsExpanded] = useState({});
    const [numDisplayed, setNumDisplayed] = useState({});

    const cookieChecker = Cookies.get('id');
   
    const handleShowMore = (id) => {
        setIsExpanded({
          ...isExpanded,
          [id]: true,
        });
      };
   

    const handleShowMoreReviews = (id) => {
        setNumDisplayed({
          ...numDisplayed,
          [id]: numDisplayed[id] ? numDisplayed[id] + 3 : 3,
        });
      };
    

    const commentHideShow = (e, id, reviewerId, isCommentHidden) => {
        
        e.preventDefault();
        // Push to back end
        axios.post('http://localhost:8080/api/home/hide', {
            reviewers: reviewerId,
            phoneID: id,
            commentHide: !isCommentHidden,
        }).then(function (response) {
        }).catch(function (error) {
            alert(error.response.data.message);
        });
        
    };

    
    return (
        <div>
            {reviewList.map((item, index) => (
                <div key={index}>
                    {item.reviews.slice(0, numDisplayed[item._id] || 3).map((review, i) => {
                    
                        let showComment = true;
                        let showHideButton = false;
                        let isCommentHidden = false;
    
                        if (review.hidden !== undefined) {
                            if (cookieChecker === review.reviewer._id || cookieChecker === item.seller._id) {
                                showHideButton = true;
                                //isCommentHidden = true;
                                isCommentHidden = true;
                            } else {
                                showComment = false;
                            }
                        } else {
                            if (cookieChecker === review.reviewer._id || cookieChecker === item.seller._id) {
                                showHideButton = true;
                                //isCommentHidden = false;
                                isCommentHidden = false;
                            }
                        }
    
                        return (
                            showComment ? (
                                <div key={i} style={{color: isCommentHidden ? 'grey' : 'black'}}>
                                    
                                    <p>Reviewer: {review.reviewer ? review.reviewer.firstname : 'Unknown'} {review.reviewer ? review.reviewer.lastname : ''}</p >
    
                                    <Rating
                                        name="simple-controlled"
                                        value={review.rating}
                                    />
                                    <p>
                                        {isExpanded[review.reviewer._id] || !review.comment ? review.comment : review.comment.substring(0, 200)}
                                    </p >
                                    {review.comment && review.comment.length > 200 && !isExpanded[review.reviewer._id] && (
                                        <Button variant="contained" onClick={() => handleShowMore(review.reviewer._id)}>Show More</Button>
                                    )}
                                    {showHideButton && (
                                        <Button variant="contained" onClick={(e) => commentHideShow(e, item._id, review.reviewer._id, isCommentHidden)}>
                                            {isCommentHidden ? 'Show' : 'Hide'}
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div key={i}>Comment Hidden</div>
                            )
                        )
                    })}
                    <div>
                        <Button variant="contained" onClick={() => handleShowMoreReviews(item._id)}>Show More Reviews</Button>
                    </div>
                </div>
            ))}
        </div>
    )
    
           
}