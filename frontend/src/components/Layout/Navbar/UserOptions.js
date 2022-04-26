import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logOut } from "../../../state/actions/userAction";

const UserOptions = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const history = useHistory();

  const logOutClick = () => {
    dispatch(logOut());
    Alert.success("Logged Out Sucessfully");
    history.push("/login");
  };
  return (
    <>
      <button className="profile-btn flex">
        {
          user && isAuthenticated ? (
            <>
              <div className="username">
                {user.name}
              </div>
              <div className="userLoggedInImage">
                <img className="userLoggedInMainImage" src={user.avatar.url} alt="" />
              </div>
            </>
          ) : (
            <>
              <div className="username">
                Sign In
              </div>
              <div className="userImage">
                <img className="userMainImage" src="/icons/user.svg" alt="" />
              </div>
            </>
          )
        }
        <div className="dropdownWrapper flex-c">
          <div className="accountList">
            <ul>
              {isAuthenticated && user.role === "admin" ? (
                <Link to="/admin/dashboard"><li><img src="/icons/dashboard.svg" className="footerIconsImg" alt="" /> Dashboard</li></Link>
              ) : (
                <></>
              )}
              <Link to="/account"><li><img src="/icons/user.svg" className="footerIconsImg" alt="" /> Your Account</li></Link>
              <Link to="/"><li><img src="/icons/product.svg" className="footerIconsImg" alt="" /> Your Products</li></Link>
              <Link onClick={logOutClick}><li><img src="/icons/logout.svg" className="footerIconsImg" alt="" /> Log Out</li></Link>
            </ul>
          </div>
          <div className="accountInfoNonLoggedIn">
            <p className="newUser"><span>If you are a new user</span></p>
            <span className="newUserRegister">
              <Link to="/login">
                Register
              </Link>
            </span>
            <span className="accountBtn btn rippleWhite">
              <Link to="/login">
                login
              </Link>
            </span>
          </div>
        </div>
      </button>
    </>
  );
};

export default UserOptions;
