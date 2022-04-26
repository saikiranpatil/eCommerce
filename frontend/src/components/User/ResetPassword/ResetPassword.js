import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ResetPassword.css";
import { clearErrors, resetPassword } from "../../../state/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../../state/constants/userConstants";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const params = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(params.token, myForm));
    }

    const { error, sucess, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (sucess) {
            alert.success("Password Updated Successfully");
            history.push('/login')
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, loading, sucess, history]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="resetPasswordWrapperSection section">
                        <div className="resetPasswordWrapper">
                            <div className="title-text">
                                <div className="title login">
                                    Reset Password
                                </div>
                            </div>
                            <div className="form-container">
                                <div className="form-inner">
                                    <form
                                        action="#"
                                        className="resetPassword"
                                        onSubmit={resetPasswordSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <div className="field">
                                            <input
                                                name="newPassword"
                                                type="password"
                                                value={password}
                                                placeholder="New Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="field">
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                value={confirmPassword}
                                                placeholder="Confirm Password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="field btn">
                                            <div className="btn-layer"></div>
                                            <input type="submit" value="Reset Password" />
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

export default ResetPassword