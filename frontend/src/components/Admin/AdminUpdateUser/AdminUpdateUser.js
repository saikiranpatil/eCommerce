import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUpdateUser.css";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import { clearErrors, getUserDetails, updateUser } from "../../../state/actions/userAction";
import { UPDATE_USER_RESET } from "../../../state/constants/userConstants";

const AdminUpdateUser = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const params = useParams();

  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { sucess, user, loading, error } = useSelector(state => state.userDetails);
  const { loading: updateLoading, isUpdated, error: updateError } = useSelector(state => state.profile);

  const adminUpdateUserSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  }

  useEffect(() => {
    if (sucess) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else {
      dispatch(getUserDetails(userId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated Sucessfully");
      history.push('/admin/dashboard')
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, loading, sucess, updateError, updateLoading, isUpdated]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="adminUpdateUserWrapperSection section">
            <div className="adminUpdateUserWrapper">
              <div className="title-text">
                <div className="title login">
                  Update User by Admin
                </div>
              </div>
              <div className="form-container">
                <div className="form-inner">
                  <form
                    action="#"
                    className="adminUpdateUser"
                    onSubmit={adminUpdateUserSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="field">
                      <input
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => { setName(e.target.value) }}
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        name="email"
                        type="text"
                        value={email}
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="field">
                      <select value={user.role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">
                          User
                        </option>
                        <option value="admin">
                          Admin
                        </option>
                      </select>
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

export default AdminUpdateUser;
