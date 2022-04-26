import React, { useEffect } from 'react';
import Pagination from '../../Utils/Pagination/Pagination';
import "./AdminProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { DELETE_PRODUCT_RESET } from '../../../state/constants/productConstants';
import { useHistory } from "react-router-dom";
import { clearErrors, getAdminProducts, deleteProduct } from '../../../state/actions/productAction';

const AdminProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { products, error } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        console.log("delete", id)
        dispatch(deleteProduct(id));
    }

    const productReviewHandler = (id) => {
        history.push(`/admin/review/${id}`);
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
            alert.success("Product Deleted Successfully");
            history.push('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts())
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
                                <th>Created On</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && !products.length ? <div className="text-center">No Products</div> :
                                    (products.map((product, index) => (
                                        <tr key={index}>
                                            <td>1</td>
                                            <td><a href="#">{product.name}</a></td>
                                            <td>{product.createdAt.slice(0, 10)}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <button className="edit" title="Settings" onClick={() => { history.push(`/admin/product/update/${product._id}`) }}>edit</button>
                                                <button className="delete" title="Delete" onClick={() => { deleteProductHandler(product._id) }}>Delete</button>
                                                <button className="reviews" title="Reviews" onClick={() => { history.push(`/admin/product/reviews/${product._id}`) }}>Reviews</button>
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

export default AdminProductList