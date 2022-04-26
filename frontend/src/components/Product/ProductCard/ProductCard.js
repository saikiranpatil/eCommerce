import React from "react";
import "./productCard.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function Product({ product, index }) {

  const productOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 16 : 20,
    activeColor: "#ffc317",
    color: "#e7e7e7",
    value: product.ratings,
    edit: false,
    isHalf: true,
  };

  return (
    <>
      <Link to={`/product/${product._id}`} className="product-card-section">
        <div className="product-card">
          <div className="product-img">
            <img src={product.images[0].url} alt="" />
          </div>
          <div className="product-name">
            {product.name}
          </div>
          <ReactStars {...productOptions} />
          <div className="product-price">
            <div class="main-product-price">
              <span class="discount-price strike">Rs {product.price}</span>
              <span class="mrp">Rs {product.price * 0.5}</span>
            </div>
            <div class="product-disc">74% OFF</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Product;
