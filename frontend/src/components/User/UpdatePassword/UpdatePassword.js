import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdatePassword.css";
import { clearErrors, updatePassword, loadUser } from "../../../state/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../../state/constants/userConstants";

const UpdatePassword = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  const { error, isUpdated, loading } = useSelector(state => state.profile)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Sucessfully");
      dispatch(loadUser());
      history.push('/account')
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, loading, isUpdated]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updatePasswordWrapperSection section">
            <div className="updatePasswordWrapper">
              <div className="title-text">
                <div className="title login">
                  Update Profile
                </div>
              </div>
              <div className="form-container">
                <div className="form-inner">
                  <form
                    action="#"
                    className="updatePassword"
                    onSubmit={updatePasswordSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="field">
                      <input
                        name="oldPassword"
                        type="password"
                        value={oldPassword}
                        placeholder="Old Password"
                        onChange={(e) => { setOldPassword(e.target.value) }}
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
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
                      <input type="submit" value="Change Password" />
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

export default UpdatePassword
