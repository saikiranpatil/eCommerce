import React, { useEffect, useState, useRef } from 'react';
import './ProductDetails.css';
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, productDetails, newReview } from "../../../state/actions/productAction"
import Review from '../ProductReview/Review';
import Loader from '../../Utils/Loader/Loader';
import { useAlert } from 'react-alert';
import Metadata from "../../Layout/Metadata";
import { NEW_REVIEW_RESET } from '../../../state/constants/productConstants';

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const modalCloseBtn = useRef(null);


  const id = useParams().id

  const { product, loading, error } = useSelector(state => state.productDetails)
  const { sucess, error: reviewError } = useSelector(state => state.newReview)

  const [reviewRatings, setReviewRatings] = useState(0);
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors());
    }

    if (sucess) {
      alert.success("Review Added Successfully");
      dispatch({ type: NEW_REVIEW_RESET })
    }

    dispatch(productDetails(id));
  }, [dispatch, error, reviewError, sucess, alert])

  const productOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 16 : 20,
    activeColor: "#ffc317",
    color: "#e7e7e7",
    value: product.ratings,
    edit: false,
    isHalf: true,
  };

  const changeReviewRatings = (newRatings) => {
    setReviewRatings(newRatings)
  }

  const submitReview = () => {
    const myForm = new FormData();

    myForm.set("rating", reviewRatings);
    myForm.set("comment", comment);
    myForm.set("productId", params.id)

    modalCloseBtn.current.click();

    dispatch(newReview(myForm));
  }

  const reviewOptions = {
    count: 5,
    size: 30,
    activeColor: "#ffc317",
    color: "#e7e7e7",
    value: 0,
    edit: true,
    isHalf: false,
    onChange: changeReviewRatings
  };

  return (
    <>
      {product && loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Sample Store: " + product.name} />
          <div className="section">
            <div className="productDetailsContainer py-5">
              <div className="product-image">
                {/* <img src="http://co0kie.github.io/codepen/nike-product-page/nikeLogo.png" alt="" className="product-logo" />
                <img src="http://co0kie.github.io/codepen/nike-product-page/nikeShoe.png" alt="" className="product-pic" />
                <div className="dots">
                  <a href="#!" className="active"><i>1</i></a>
                  <a href="#!"><i>2</i></a>
                  <a href="#!"><i>3</i></a>
                  <a href="#!"><i>4</i></a>
                </div> */}
                <div className="product-imgs">
                  <div className="img-display">
                    <div className="img-showcase">
                      {/* {
                        product && product.images.map((image,index) =>(
                      <img src={image.url} alt="product preview" />
                        ))
                      } */}
                      <img alt="shoe image" />
                    </div>
                  </div>
                  <div className="img-select">
                    <div className="img-item">
                      <a href="#" data-id={1}>
                        <img src="shoes_images/shoe_1.jpg" alt="shoe image" />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id={2}>
                        <img src="shoes_images/shoe_2.jpg" alt="shoe image" />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id={3}>
                        <img src="shoes_images/shoe_3.jpg" alt="shoe image" />
                      </a>
                    </div>
                    <div className="img-item">
                      <a href="#" data-id={4}>
                        <img src="shoes_images/shoe_4.jpg" alt="shoe image" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <header>
                  <div className="d-flex justify-content-between flex-column">
                    <h1 className="title">
                      {product.name}
                    </h1>
                    <div className="d-flex flex-row">
                      <ReactStars {...productOptions} />
                      <small id="reviewCount" className="my-auto ml-1">
                        ({product.noOfReviews}) Reviews
                      </small>
                    </div>
                  </div>
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
                  {/* Review Section starts here */}
                  <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Launch demo modal
                  </button>

                  <div className="modal fade" id="exampleModalCenter" ref={modalCloseBtn} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLongTitle">Add Review</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modalCloseBtn}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <ReactStars {...reviewOptions} />
                            <div className="form-group">
                              <label htmlFor="reviews">Add your review Below</label>
                              <textarea className="form-control" id="reviews" value={comment} onChange={(e) => { setComment(e.target.value) }} rows="3"></textarea>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" onClick={submitReview}>Add Review</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Review Section ends here */}
                  <a href="#!"><img src="http://co0kie.github.io/codepen/nike-product-page/share.png" alt="" /></a>
                </div>
              </div>
            </div>
            <div className="mgb-40 padb-30 auto-invert line-b-4 text-center">
              <small className="gray-txt">Not Yet Convinced?</small>
              <h1 className="section-head">Read Customer Reviews</h1>
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews.map((review) => <Review key={review._id} review={review} />)}
                </div>

              ) : (
                <p className="text-center py-5">No reviews</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails

