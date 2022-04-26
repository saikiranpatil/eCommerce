import React, { useEffect } from "react";
import Metadata from "../Layout/Metadata";
import "./home.css";
import Product from "../Product/ProductCard/ProductCard";
import { clearErrors, getProducts } from "../../state/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Utils/Loader/Loader";
import { useAlert } from 'react-alert';

export default function Home() {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Home | Sample Store" />
          <div id="hero">
            <span className="text-light">Welcome to sample store</span>
            <h1 className="text-light">Find your Products Below</h1>
            <button className="scroll-btn">Scroll Down</button>
          </div>
          <section className="featured-products-section">
            <h2 className="text-center title-txt">Featured Product</h2>
            <div className="all-products">
              {products && !products.length ? (<div className="text-center">No Products</div>
              ) : (
                products.map((product, index) => <Product key={product._id} product={product} index={index} />))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
