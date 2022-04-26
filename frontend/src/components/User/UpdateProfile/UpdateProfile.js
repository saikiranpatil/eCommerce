import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpdateProfile.css";
import { clearErrors, updateUsers, loadUser } from "../../../state/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../Utils/Loader/Loader";
import { useHistory } from "react-router-dom";
import { UPDATE_USERS_RESET } from "../../../state/constants/userConstants";

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const history = useHistory();

    const { error, loading, isUpdated } = useSelector(
        (state) => state.profile
    );
    const { user } = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileSubmit = (e) => {
        console.log(avatar, "\n", avatarPreview);

        e.preventDefault();

        let myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateUsers(myForm));
    }

    const avatarChange = (e) => {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        console.log(reader.result);
    }
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
            setAvatar(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("ProfileUpdated Sucessfully");
            dispatch(loadUser());
            history.push('/account')
            dispatch({ type: UPDATE_USERS_RESET });
        }
    }, [dispatch, error, alert, loading, isUpdated, history, user]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="updateProfileWrapperSection section">
                        <div className="updateProfileWrapper">
                            <div className="title-text">
                                <div className="title login">
                                    Update Profile
                                </div>
                            </div>
                            <div className="form-container">
                                <div className="form-inner">
                                    <form
                                        action="#"
                                        className="updateProfile"
                                        onSubmit={updateProfileSubmit}
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
                                                placeholder="Email Address"
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="field d-flex" id="updateProfileImage">
                                            <img src={avatarPreview} className="border" alt="" />
                                            <input
                                                type="file"
                                                placeholder="Confirm password"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={avatarChange}
                                            />
                                        </div>
                                        <div className="field btn">
                                            <div className="btn-layer"></div>
                                            <input type="submit" value="Update" />
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
}

export default UpdateProfile