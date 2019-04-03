import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logout} from "../actions/authActions";





class Navbar extends React.Component {

    unauthenticatedSection = (
        <ul className="navbar-nav ml-auto">
               <li className="nav-item">
               <Link to="/register"  className="nav-link">Register</Link>
               </li>
               <li className="nav-item">
               <Link to="login" className="nav-link">Login</Link>
               </li>
               </ul>
   )

    authenticatedSection = (
        <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                
                <button className = "btn btn-primary-outline nav-link"
                onClick = {this.props.logout}
                >
                <img src={this.props.avatar} className="rounded-circle"
               title = "You must attach your email with gravatar for an image "
                style = {{width: "25px", marginRight: "5px"}} alt=""/>
                Logout</button>
                </li>
                </ul>
    )

      

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
           {this.props.isAuthenticated? this.authenticatedSection : this.unauthenticatedSection}
            </div>
            </div>
            </nav>
        )
    }
}

const mapState = state => ({
    isAuthenticated: !!state.auth.user.id,
    avatar: state.auth.user.avatar
})

export default connect(mapState, {logout})(Navbar);