import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginSignUp.css";
import { clearErrors, login, register } from "../../../state/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory,Link } from "react-router-dom";


const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const history = useHistory();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginText = useRef(null);
  const loginForm = useRef(null);

  const signUpBtnClick = () => {
    loginForm.current.style.marginLeft = "-50%";
    loginText.current.style.marginLeft = "-50%";
  };

  const loginBtnClick = () => {
    loginForm.current.style.marginLeft = "0%";
    loginText.current.style.marginLeft = "0%";
  };

  const signUpLinkClick = () => {
    signUpBtnClick();
    return false;
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("login submitted");
    dispatch(login(loginEmail, loginPassword));
  };

  const signUpSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    myForm.set("password", password);

    dispatch(register(myForm));
  };

  const signUpDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      console.log(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);


      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(`/account`);
    }
  }, [dispatch, error, alert, isAuthenticated, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="loginSignUpWrapperSection section">
            <div className="loginSignUpWrapper">
              <div className="title-text">
                <div className="title login" ref={loginText}>
                  Login Form
                </div>
                <div className="title signup">Signup Form</div>
              </div>
              <div className="form-container">
                <div className="slide-controls">
                  <input type="radio" name="slide" id="login" checked />
                  <input type="radio" name="slide" id="signup" />
                  <label
                    htmlFor="login"
                    className="slide login"
                    onClick={loginBtnClick}
                  >
                    Login
                  </label>
                  <label
                    htmlFor="signup"
                    className="slide signup"
                    onClick={signUpBtnClick}
                  >
                    Signup
                  </label>
                  <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                  <form
                    action="#"
                    className="login"
                    ref={loginForm}
                    onSubmit={loginSubmit}
                  >
                    <div className="field">
                      <input
                        type="text"
                        placeholder="Email Address"
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="pass-link">
                      <Link to="/password/forgot">Forgot password?</Link>
                    </div>
                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input type="submit" value="Login" />
                    </div>
                    <div className="signup-link">
                      Not a member?{" "}
                      <a href="" onClick={signUpLinkClick}>
                        Signup now
                      </a>
                    </div>
                  </form>
                  <form
                    action="#"
                    className="signup"
                    onSubmit={signUpSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="field">
                      <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={signUpDataChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        name="email"
                        type="text"
                        placeholder="Email Address"
                        onChange={signUpDataChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={signUpDataChange}
                        required
                      />
                    </div>
                    <div className="field d-flex" id="signUpImage">
                      <img src={avatarPreview} alt="" />
                      <input
                        type="file"
                        placeholder="Confirm password"
                        name="avatar"
                        accept="image/*"
                        onChange={signUpDataChange}
                      />
                    </div>
                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input type="submit" value="Signup" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
