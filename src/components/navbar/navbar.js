import React from 'react';
import { Link} from 'react-router-dom';
import {logout} from '../../utils/index'
import './navbar.css'

class Navbar extends React.Component {
     
    handleLogout(){
       logout();
    }

    render(){
        return(
            <div className="navbarReact">
                    <Link  to="/dashboard"  className="link">Dashboard</Link>
                    <Link  to="/products"   className="link">Products</Link>
                    <Link  to="/login"      className="rightlink"  onClick={this.handleLogout}>Logout</Link>
            </div>
        )
    }
}

export default Navbar;