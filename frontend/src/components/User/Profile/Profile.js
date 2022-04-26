import React, { useEffect } from 'react';
import "./Profile.css";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Utils/Loader/Loader";

const Profile = () => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user);
    const history = useHistory();

    return (
        <>
            {loading ?
                <Loader /> : <>
                    <>
                        <div className="profileContainer section d-flex flex-wrap justify-content-around align-items-center">
                            <div className="profileImg d-flex flex-column">
                                <h1 className="text-center mb-5 title">My Profile</h1>
                                <img
                                    src={user.avatar.url}
                                    width="250"
                                    height="250"
                                    className="profileImage rounded-circle border"
                                    alt={user.name}
                                />
                                <Link className="btn btn-primary mt-5" to="/me/update">Edit Profile</Link>
                            </div>
                            <div className="profileDetails mx-3 d-flex  flex-column mt-5">
                                <div className="mb-4">
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div className="mb-4">
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div className="mb-4">
                                    <h4>Joined On</h4>
                                    <p>{user.createdAt.substr(0, 10)}</p>
                                </div>
                                <div>
                                    <Link className="btn btn-primary w-100 my-2" to="/orders">
                                        My Orders
                                    </Link>
                                    <Link className="btn btn-primary w-100 my-2" to="/password/update">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                </>}
        </>
    )
}

export default Profile