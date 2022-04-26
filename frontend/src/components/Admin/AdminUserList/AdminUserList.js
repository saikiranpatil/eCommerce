import React, { useEffect } from 'react';
import Pagination from '../../Utils/Pagination/Pagination';
import "./AdminUserList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { getAllUsers, clearErrors, deleteUser } from '../../../state/actions/userAction';
import { DELETE_USER_RESET } from '../../../state/constants/userConstants';

const AdminUserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { users, error } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted } = useSelector((state) => state.profile);


    const deleteuserHandler = (id) => {
        console.log("delete", id)
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("User Deleted Successfully");
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers())
    }, [dispatch, alert, error, isDeleted, deleteError, history]);
    return (
        <div className="container-xl section">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>User <b>Management</b></h2>
                            </div>
                            <div className="col-sm-7">
                                <a href="#" className="btn btn-secondary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></a>
                                <a href="#" className="btn btn-secondary"><i className="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joned On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>1</td>
                                <td><a href="#"><img src="/examples/images/avatar/1.jpg" className="avatar" alt="Avatar" /> Michael Holz</a></td>
                                <td>04/10/2013</td>
                                <td>Admin</td>
                                <td><span className="status text-success">&bull;</span> Active</td>
                                <td>
                                    <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                    <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                </td>
                            </tr> */}
                            {
                                users && !users.length ? <div className="text-center">No users</div> :
                                    (users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index+1}</td>
                                            <td><a href="#"><img src={user.avatar.url} height="50px" className="avatar" alt="Avatar" /> {user.name}</a></td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.createdAt.substring(0,10)}</td>
                                            <td>
                                                <button className="edit" title="Settings" onClick={() => { history.push(`/admin/user/update/${user._id}`) }}>edit</button>
                                                <button className="delete" title="Delete" onClick={() => { deleteuserHandler(user._id) }}>Delete</button>
                                                <button className="view" title="view">View</button>
                                            </td>
                                        </tr>
                                    )))
                            }
                        </tbody>
                    </table>
                    <Pagination currentPage={1} totalPages={1} setThisPage={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default AdminUserList