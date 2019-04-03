import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const GuestRoute = ({isAuthenticated, component: Component, ...rest}) => (
    <Route {...rest} render = {props => !isAuthenticated? <Component {...props} /> :
     <Redirect to="/dashboard" />    } />
    )

    const mapState = state => ({
        isAuthenticated: !! state.auth.user.id
    })

 export default connect(mapState)(GuestRoute);