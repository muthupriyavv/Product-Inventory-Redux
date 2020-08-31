import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../components/login/login'
import Dashboard from '../components/dashboard/dashboard'
import Product from '../components/products/product'
import AddProduct from '../components/products/addproducts/addproducts'
import EditModel from '../components/products/editmodel/editmodel'
import SignUp from '../components/signup/signup'
import PrivateRoute from '../routing/privateRoute'
import PublicRoute from '../routing/publicRoute'
import Navbar from '../components/navbar/navbar';

class AppRouter extends React.Component{
    render(){
        return(
            <Router>
              <Navbar />
              <Switch>
              <PublicRoute component={Login} path="/login" exact={true} />
              <PublicRoute component={SignUp} path="/signup" exact={true} />
              <PrivateRoute component={Dashboard} path="/dashboard"  exact={true} />
              <PrivateRoute component={Product} path="/products" exact={true}  />
              <PrivateRoute component={AddProduct} path="/products/addproduct" exact={true}  />
              <PrivateRoute component={EditModel} path="/products/editproduct/:id" exact={true}  />
              </Switch>
            </Router>
        )
    }

}
export default AppRouter;

