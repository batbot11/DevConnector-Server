import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    render () {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
            <Link to="/" className="navbar-brand">DevConnector</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav" >
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to="/profiles" className="nav-link" >Developers</Link>
            </li>
            </ul>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link to="/register"  className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
            <Link to="login" className="nav-link">Login</Link>
            </li>
            </ul>
            </div>
            </div>
            </nav>
        )
    }
}

export default Navbar;