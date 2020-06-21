import React,{Fragment} from 'react';
//link- we don't want to reload the page on each time we click on link like <a></a>
//withRouter- because we need to access the props history
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth";
const isActive = (history,path) => {
    if(history.location.pathname === path) {
        return { color: "#ff9900" };
    }else{
        return { color: "#ffffff" };
    }
};

const Menu = ({history}) => (
    // eslint-disable-next-line no-unused-expressions
    //to- what should happen
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history,'/')} 
                to="/"
                >
                Home
                </Link>
            </li>
           {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history, '/user/dashboard')} 
                to="/user/dashboard"
                >
                Dashboard
                </Link>
            </li>
           )}
           {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history, '/user/admin/dashboard')} 
                to="/admin/dashboard"
                >
                Dashboard
                </Link>
            </li>
           )}
            
            
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history, '/signin')} 
                to="/signin"
                >
                Signin
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history, '/signup')} 
                to="/signup"
                >
                Signup
                </Link>
            </li>
                </Fragment>
            )}
          {isAuthenticated() && (
            <li className="nav-item">
                <span 
                className="nav-link" 
                style={{cursor: "pointer", color: "#ffffff"}} 
                onClick={() => 
                signout(() => {
                    history.push("/");
                })
                }
                >
                Signout
                </span>
            </li>
          )}
        </ul>
    </div>
);

export default withRouter(Menu);