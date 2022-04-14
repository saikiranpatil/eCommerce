import React, { useEffect } from 'react';
import './ProductDetails.css';
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, productDetails } from "../../../state/actions/productAction"
import Review from '../ProductReview/Review';
import Loader from '../../Utils/Loader/Loader';
import { useAlert } from 'react-alert';
import Metadata from "../../Layout/Metadata";

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const id = useParams().id

  const { product, loading, error } = useSelector(state => state.productDetails)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }

    dispatch(productDetails(id));
  }, [dispatch, error, alert, id])

  const productOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "#fe6067",
    value: product.ratings,
    edit: false,
    isHalf: true,
  };

  return (
    <>
      {product && loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Sample Store: " + product.name} />
          <div className="productDetailsContainer py-5">
            <div className="product-image">
              <img src="http://co0kie.github.io/codepen/nike-product-page/nikeLogo.png" alt="" className="product-logo" />
              <img src="http://co0kie.github.io/codepen/nike-product-page/nikeShoe.png" alt="" className="product-pic" />
              <div className="dots">
                <a href="#!" className="active"><i>1</i></a>
                <a href="#!"><i>2</i></a>
                <a href="#!"><i>3</i></a>
                <a href="#!"><i>4</i></a>
              </div>
            </div>
            <div className="product-details">
              <header>
                <div className="d-flex justify-content-between">
                  <h1 className="title">
                    {product.name}
                  </h1>
                  <div className="d-flex flex-column">
                    <ReactStars {...productOptions} />
                    <small id="reviewCount">
                      ({product.noOfReviews}) Reviews
                    </small>
                  </div>
                </div>
                <span className="colorCat">{product.category}</span>
                <div className="price">
                  <span className="before">{`₹ ${product.price * 1.25}`}</span>
                  <span className="current">{`₹ ${product.price}`}</span>
                </div>
                <div className="status">
                  <h5 className={product.stock > 0 ? "inStock" : "noStock"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</h5>
                </div>
              </header>
              <article>
                <h5>Description</h5>
                <p>{product.description}</p>
              </article>
              <div className="controls">
                <div className="color">
                  <h5>color</h5>
                  <ul>
                    <li><a href="#!" className="colors color-bdot1 active" /></li>
                    <li><a href="#!" className="colors color-bdot2" /></li>
                    <li><a href="#!" className="colors color-bdot3" /></li>
                    <li><a href="#!" className="colors color-bdot4" /></li>
                    <li><a href="#!" className="colors color-bdot5" /></li>
                  </ul>
                </div>
                <div className="size">
                  <h5>size</h5>
                  <a href="#!" className="option">(UK 8)</a>
                </div>
                <div className="qtySection">
                  <h5>qty</h5>
                  <div className="qty">
                    <a href="#!" className="option">(1)</a>
                  </div>
                </div>
              </div>
              <div className="footer">
                <button type="button">
                  <i className="fa fa-cart-shopping text-light"></i>
                  <span >add to cart</span>
                </button>
                <a href="#!"><img src="http://co0kie.github.io/codepen/nike-product-page/share.png" alt="" /></a>
              </div>
            </div>
          </div>
          <div className="mgb-40 padb-30 auto-invert line-b-4 text-center">
            <small className="font-cond-l fg-accent lts-md mgb-10">Not Yet Convinced?</small>
            <h1 className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg">Read Customer Reviews</h1>
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews.map((review) => <Review key={review._id} review={review} />)}
              </div>

            ) : (
              <p className="text-center py-5">No reviews</p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails

