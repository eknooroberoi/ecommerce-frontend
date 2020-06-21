import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
//BrowserRouter is a component, it will wrap the rest of the routes, it will make the props available to other nested components
//we can grab the route parameters
//import pages created in user folder
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";

const Routes = () => {
    return (
    <BrowserRouter>
 
        <Switch>
            <Route path="/" exact component= {Home} />
            <Route path="/signin" exact component= {Signin} />
            <Route path="/signup" exact component= {Signup} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
    </BrowserRouter>
    );
};

//Routes component is returning entire application, coz entire application will be based on components and all of them will be available here

export default Routes;