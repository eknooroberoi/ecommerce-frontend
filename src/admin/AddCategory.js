import React, {useState} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from './apiAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();


    const handleChange= (e) => {
        setError('');
        setName(e.target.value);
    };
    const clickSubmit= (e) =>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        //make request to API to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(true);
            }else{
                setError('');
                setSuccess(true);
            }
        });
    };

    //create a form
    //create 2 methods, 1. to handle change 2. handle submit 
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit} >
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>
                <input 
                type="text" 
                className="form-control" 
                onChange={handleChange} 
                value={name} 
                autoFocus 
                required/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );
    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };
    //error if category is not unique
    const showError = () => {
        if(error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
    );
    return (
        <Layout title = "Add a new Category" description = {`Hii ${user.name}, Ready to add a new Category?`} >
           
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;