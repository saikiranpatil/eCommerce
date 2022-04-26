import React from 'react';
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { user } = useSelector(state => state.user);

    return (
        <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left" id="show-side-navigation1">
            <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1" />
            <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
                <img className="rounded-pill img-fluid" width={65} src={user.avatar.url} alt="" />
                <div className="ms-2">
                    <h5 className="fs-6 mb-0">
                        <a className="text-decoration-none" href="#">{user.name}</a>
                    </h5>
                    <p className="mt-1 mb-0">{user.role}</p>
                </div>
            </div>
            <div className="search position-relative text-center px-4 py-3 mt-2">
                <input type="text" className="form-control w-100 border-0 bg-transparent" placeholder="Search here" />
                <i className="fa fa-search position-absolute d-block fs-6" />
            </div>
            <ul className="categories list-unstyled">
                <li className="has-dropdown">
                    <i className="uil-estate fa-fw" /><a href="#"> Dashboard</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className>
                    <i className="uil-folder" /><a href="#"> File manager</a>
                </li>
                <li className="has-dropdown">
                    <i className="uil-calendar-alt" /><a href="#"> Calender</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className="has-dropdown">
                    <i className="uil-envelope-download fa-fw" /><a href="#"> Mailbox</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className="has-dropdown">
                    <i className="uil-shopping-cart-alt" /><a href="#"> Ecommerce</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className="has-dropdown">
                    <i className="uil-bag" /><a href="#"> Projects</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className>
                    <i className="uil-setting" /><a href="#"> Settings</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className="has-dropdown">
                    <i className="uil-chart-pie-alt" /><a href="#"> Components</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className="has-dropdown">
                    <i className="uil-panel-add" /><a href="#"> Charts</a>
                    <ul className="sidebar-dropdown list-unstyled">
                        <li><a href="#">Lorem ipsum</a></li>
                        <li><a href="#">ipsum dolor</a></li>
                        <li><a href="#">dolor ipsum</a></li>
                        <li><a href="#">amet consectetur</a></li>
                        <li><a href="#">ipsum dolor sit</a></li>
                    </ul>
                </li>
                <li className>
                    <i className="uil-map-marker" /><a href="#"> Maps</a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
