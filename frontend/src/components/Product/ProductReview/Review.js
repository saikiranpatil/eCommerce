import React from 'react'
import ReactStars from 'react-rating-stars-component';
import "./Review.css";

function Review({ review }) {
  const reviewOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "#ffc317",
    color: "#e7e7e7",
    value: review.rating,
    edit: false,
    isHalf: true,
  };
  return (
    <div class="review flex">
      <div class="userimg"><img className="round-img review-img" height="60px" src={review.avatar.url} alt="" />
      </div>
      <div class="text">
        <div class="user-review flex-c">
          <div class="rating">
            <ReactStars {...reviewOptions} />
          </div>
          <div class="reviewUserName" title={review.name}>by {review.name} on {review.createdAt.slice(0,10)}</div>
          <p className="comment">{review.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default Review