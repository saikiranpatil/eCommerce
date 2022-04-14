import React, { useEffect, useState } from "react";
import Loader from "../../Utils/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../../state/actions/productAction";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Product from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Pagination from "../../Utils/Pagination/Pagination";
import RangeSlider, { price } from "../../Utils/RangeSlider/RangeSlider";
import "./style.css";
import ReactStars from "react-rating-stars-component";
import Metadata from "../../Layout/Metadata";

function Products() {

  const minPriceValue = 0;
  const maxPriceValue = 30000;

  const allCategories = ["Laptop", "Footware", "Cycle", "Smartphones", "Books"]

  const alert = useAlert();
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const { loading, error, products, productsCount, productsPerPage } = useSelector(
    (state) => state.products
  );

  const totalPages = Math.ceil(productsCount / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("")

  const [price, setPrice] = useState([0, 30000]);
  const [ratings, setRatings] = useState(0);

  const setNewRatings = (ratings) => (ratings) => {
    setRatings(ratings)
    console.log(ratings)
  }

  const productOptions = {
    count: 5,
    size: window.innerWidth < 600 ? 20 : 25,
    activeColor: "#fe6067",
    value: ratings,
    edit: true,
    isHalf: false,
    changeRating: setNewRatings()
  };

  const changeRatings = (e) => (e) => { setRatings(e.target.value) }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, error, alert, keyword, currentPage, price, category]);

  return (
    <>
      <Metadata title={"Sample Store" + (keyword ? `: ${keyword}` : "")} />
      <section className="section section-products d-flex">
        <div id="filterBox">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Price & Deals
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div className="accordion-body">
                  <RangeSlider setPrice={setPrice} minValue={minPriceValue} maxValue={maxPriceValue} />
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Categories
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div className="accordion-body d-flex flex-wrap justify-content-center">
                  {allCategories.map((type) => (
                    <button type="button" key={type} onClick={() => setCategory(type)} className="btn btn-outline-primary mx-3 my-2 btn-sm">{type}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Ratings
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ReactStars {...productOptions} /> & Above {ratings}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container">
              <h5>Results</h5>
              <div className="row">
                {products && !products.length ? <div className="text-center">No Products</div> :
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} setThisPage={setCurrentPage} />
              }
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Products;
