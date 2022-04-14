import React from 'react'
import ReactStars from 'react-rating-stars-component';

function Review({review}) {
    const reviewOptions = {
        count: 5,
        size: window.innerWidth < 600 ? 20 : 25,
        activeColor: "#fe6067",
        value: review.rating,
        edit: false,
        isHalf: true,
      };
    return (
        <div className="review">
        <div className="head-review">
          <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" width="250px" />
        </div>
        <div className="body-review">
          <div className="name-review">{review.name}</div>
          <div className="place-review">New York</div>
          <div className="rating d-flex justify-content-center">
            <ReactStars {...reviewOptions} />
          </div>
          <div className="desc-review">{review.comment}</div>
        </div>
      </div>
    )
}

export default Review