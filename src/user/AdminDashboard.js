import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated();
    //add links on user dashboard
    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
            </ul>
        </div>
        );
    };

    
    //total 12 column grid
    return (
        <Layout title = "Dashboard" description = {`Hey ${name}! Have a Good Day😎`} className="container-fluid">
           
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    );
};
export default AdminDashboard;