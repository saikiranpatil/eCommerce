import React, { useEffect } from 'react';
import "./AdminDashboard.css";
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from '../../../state/actions/productAction';
import { useAlert } from "react-alert";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { getAllUsers } from '../../../state/actions/userAction';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const { user } = useSelector(state => state.user);

    const { users } = useSelector((state) => state.allUsers);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


    const alert = useAlert();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    let outOfStock = 0;

    products && products.forEach((product) => {
        if (parseInt(product.stock) === 0) {
            outOfStock += 1;
        }
    })

    const stockData = [outOfStock, products.length - outOfStock];

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllUsers());
    }, [dispatch, alert, user]);


    const lineState = {
        labels: ["Initial Amount", "Total Amount", "Next Amount", "Next Amount"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["red"],
                data: [0, 1800, 4000, 4500]
            }
        ]
    };
    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato", "red"],
                hoverBackgroundColor: ["red", "tomato"],
                data: stockData
            }
        ]
    };
    return (
        <>
            <div className="dashboardContainer">
                <div>
                    <Sidebar />
                    <section id="wrapper">
                        <div className="p-4">
                            <div className="welcome">
                                <div className="content rounded-3 p-3">
                                    <h1 className="fs-3">Welcome to Dashboard</h1>
                                    <p className="mb-0">Hello {user.name}, welcome to your awesome dashboard!</p>
                                </div>
                            </div>
                            <section className="statistics mt-4">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                                            <i className="uil-envelope-shield fs-2 text-center bg-primary rounded-circle" />
                                            <div className="ms-3">
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mb-0">1,245</h3> <span className="d-block ms-2">Emails</span>
                                                </div>
                                                <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                                            <i className="uil-file fs-2 text-center bg-danger rounded-circle" />
                                            <div className="ms-3">
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mb-0">34</h3> <span className="d-block ms-2">Projects</span>
                                                </div>
                                                <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="box d-flex rounded-2 align-items-center p-3">
                                            <i className="uil-users-alt fs-2 text-center bg-success rounded-circle" />
                                            <div className="ms-3">
                                                <div className="d-flex align-items-center">
                                                    <h3 className="mb-0">{users && users.length}</h3> <span className="d-block ms-2">Users</span>
                                                </div>
                                                <p className="fs-normal mb-0">Lorem ipsum dolor sit amet</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="charts mt-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="chart-container rounded-2 p-3">
                                            <h3 className="fs-6 mb-3">Chart title number one</h3>
                                            <Line data={lineState} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="chart-container rounded-2 p-3">
                                            <h3 className="fs-6 mb-3">Chart title number two</h3>
                                            <Doughnut data={doughnutState} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="admins mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="box">
                                            {/* <h4>Admins:</h4> */}
                                            <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148906966/small/1501685402/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                            <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907137/small/1501685404/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                            <div className="admin d-flex align-items-center rounded-2 p-3">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907019/small/1501685403/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="box">
                                            {/* <h4>Moderators:</h4> */}
                                            <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907114/small/1501685404/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                            <div className="admin d-flex align-items-center rounded-2 p-3 mb-4">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907086/small/1501685404/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                            <div className="admin d-flex align-items-center rounded-2 p-3">
                                                <div className="img">
                                                    <img className="img-fluid rounded-pill" width={75} height={75} src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance" alt="admin" />
                                                </div>
                                                <div className="ms-3">
                                                    <h3 className="fs-5 mb-1">Joge Lucky</h3>
                                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur elit.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="statis mt-4 text-center">
                                <div className="row">
                                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                                        <div className="box bg-primary p-3">
                                            <i className="uil-eye" />
                                            <h3>5,154</h3>
                                            <p className="lead">Page views</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                                        <div className="box bg-danger p-3">
                                            <i className="uil-user" />
                                            <h3>245</h3>
                                            <p className="lead">User registered</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
                                        <div className="box bg-warning p-3">
                                            <i className="uil-shopping-cart" />
                                            <h3>5,154</h3>
                                            <p className="lead">Product sales</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="box bg-success p-3">
                                            <i className="uil-feedback" />
                                            <h3>5,154</h3>
                                            <p className="lead">Transactions</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="charts mt-4">
                                <div className="chart-container p-3">
                                    <h3 className="fs-6 mb-3">Chart title number three</h3>
                                    <div style={{ height: '300px' }}>
                                        <canvas id="chart3" width="100%" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Dashboard