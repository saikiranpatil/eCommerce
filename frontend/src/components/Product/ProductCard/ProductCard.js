import React from "react";
import "./productCard.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function Product({ product }) {
  const productOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "#ffd700",
    value: product.ratings,
    edit: false,
    isHalf: true,
  };
  return (
    <Link to={`/product/${product._id}`} className="col-md-6 col-lg-4 col-xl-3">
      <div id="product-1" className="single-product">
        <div className="part-1">
          <span className="new">new</span>
          <span className="discount">15% off</span>
          <ul>
            <li>
              <Link to="/#">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li>
              <Link to="/#">
                <i className="fas fa-heart"></i>
              </Link>
            </li>
            <li>
              <Link to="/#">
                <i className="fas fa-plus"></i>
              </Link>
            </li>
            <li>
              <Link to="/#">
                <i className="fas fa-expand"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="part-2">
          <h3 className="product-title">{product.name}</h3>
          <h4 className="product-old-price">{`₹ ${product.price * 1.25}`}</h4>
          <h4 className="product-price">{`₹ ${product.price}`}</h4>
          <span className="reviews d-flex">
            <ReactStars {...productOptions} />
            <small className="text-muted m-2 align-middle">({product.noOfReviews}) Reviews</small>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Product;
