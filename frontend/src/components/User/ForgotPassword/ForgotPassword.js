import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ForgotPassword.css";
import { clearErrors, forgotPassword, loadUser } from "../../../state/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory } from "react-router-dom";
import { FORGOT_PASSWORD_RESET } from "../../../state/constants/userConstants";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
    }

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
            dispatch({ type: FORGOT_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, loading, message]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="forgotPasswordWrapperSection section">
                        <div className="forgotPasswordWrapper">
                            <div className="title-text">
                                <div className="title login">
                                    Forgot Password
                                </div>
                            </div>
                            <div className="form-container">
                                <div className="form-inner">
                                    <form
                                        action="#"
                                        className="forgotPassword"
                                        onSubmit={forgotPasswordSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <div className="field">
                                            <input
                                                name="email"
                                                type="text"
                                                value={email}
                                                placeholder="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="field btn">
                                            <div className="btn-layer"></div>
                                            <input type="submit" value="Forgot Password" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ForgotPassword