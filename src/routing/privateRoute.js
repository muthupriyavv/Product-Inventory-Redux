import React from 'react'
import {Route , Redirect} from 'react-router-dom';
import {isLogin} from '../utils/index'


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component={props => (
            isLogin() ?
            <div>
            <Component {...props} />
            </div>
            : 
            <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;