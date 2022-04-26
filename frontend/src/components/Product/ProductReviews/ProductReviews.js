import React, { useEffect } from 'react';
import Pagination from '../../Utils/Pagination/Pagination';
import "./ProductReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import { DELETE_REVIEW_RESET } from '../../../state/constants/productConstants';
import { clearErrors } from '../../../state/actions/userAction';
import { allReviews, deleteReview } from '../../../state/actions/productAction';

const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const params = useParams();

    const productId = params.id;

    const { error: deleteError, isDeleted } = useSelector(state => state.deleteProductReviews);

    const { error, reviews } = useSelector(state => state.productReviews);

    const deleteReviewHandler = (id) => {
        console.log("delete", id)
        let myForm = new FormData();

        myForm.set("userId", id);
        myForm.set("productId", productId);

        dispatch(deleteReview(id, productId));
    }

    useEffect(() => {
        dispatch(allReviews());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            history.push('/admin/reviews');
            dispatch({ type: DELETE_REVIEW_RESET });
        }

        dispatch(allReviews(productId));
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
                                <th>Comment</th>
                                <th>Rating</th>
                                <th>Created On</th>
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
                                reviews && !reviews.length ? <div className="text-center">No Reviews</div> :
                                    (reviews.map((product, index) => (
                                        <tr key={index}>
                                            <td>1</td>
                                            <td><a href="#">{product.name}</a></td>
                                            <td>{product.createdAt.slice(0, 10)}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <button className="delete" title="Delete" onClick={() => { deleteReviewHandler(product._id) }}>Delete</button>
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

export default ProductReviews