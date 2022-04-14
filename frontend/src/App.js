import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import Products from "./components/Product/Products/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./state/store";
import { loadUser } from "./state/actions/userAction";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  },[])
  
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/:keyword">
          <Products />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/login">
          <LoginSignUp />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
