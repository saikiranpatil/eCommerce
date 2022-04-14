import React, { useEffect } from "react";
import Metadata from "../Layout/Metadata";
import "./home.css";
import Product from "../Product/ProductCard/ProductCard";
import { clearErrors, getProducts } from "../../state/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Utils/Loader/Loader";
import {useAlert} from 'react-alert';

export default function Home() {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch,error,alert]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Home | Sample Store" />
          <div id="hero">
            <span className="text-light my-1">Welcome to sample store</span>
            <h1 className="text-light my-3">Find your Products Below</h1>
            <button className="btn btn-outline-light my-3">Scroll Down</button>
          </div>
          <section className="section-products">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-md-8 col-lg-6">
                  <div className="header">
                    <h3>Featured Product</h3>
                    <h2>Popular Products</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                {products && !products.length ? (<div className="text-center">No Products</div>
                ) :(
                  products.map((product) => <Product key={product._id} product={product} />))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
