import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from '../utils/index'

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest}  component={props => (
            isLogin()  ?
            <Redirect to="/dashboard" /> :
            <Component {...props} /> 
        )} />
    );
};

export default PublicRoute;