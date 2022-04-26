import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import Products from "./components/Product/Products/Products";
import LoginSignUp from "./components/User/LoginSIgnUp/LoginSignUp";
import store from "./state/store";
import { loadUser } from "./state/actions/userAction";
import Profile from "./components/User/Profile/Profile";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import Dashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AddProduct from "./components/Product/NewProduct/NewProduct";
import UpdateProduct from "./components/Product/UpdateProduct/UpdateProduct";
import AdminProductList from "./components/Admin/AdminProductList/AdminProductList";
import AdminUserList from "./components/Admin/AdminUserList/AdminUserList";
import AdminUpdateUser from "./components/Admin/AdminUpdateUser/AdminUpdateUser";
import ProductReviews from "./components/Product/ProductReviews/ProductReviews";
import Loader from "./components/Utils/Loader/Loader";

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Router>
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/loading" component={Loader} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <ProtectedRoute exact path="/user/product/new" component={AddProduct} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/register" component={LoginSignUp} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={AdminProductList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={AdminUserList} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/update/:id" component={UpdateProduct} />
        <ProtectedRoute isAdmin={true} exact path="/admin/user/update/:id" component={AdminUpdateUser} />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/reviews/:id" component={ProductReviews} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;