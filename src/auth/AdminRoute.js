import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//useful for restricting things, like whatever only logged in user can see or do and not others
//if i go to dashboard, it will redirect to signin, once signin we can se dashboard page, therefore protecting route for logged in users only
const AdminRoute = ({component: Component , ...rest }) => (
    //if user is authenticated, we return components with props else redirect them to login page
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;

