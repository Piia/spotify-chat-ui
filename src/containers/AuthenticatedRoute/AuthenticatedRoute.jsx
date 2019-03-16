import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const RedirectingComponent = ({ component: Component, loggedIn, ...rest }) => (
    loggedIn === true
        ? <Component {...rest} />
        : <Redirect to={"/"} />
);

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
})

const ConnectedRedirectingComponent = connect(mapStateToProps)(RedirectingComponent);

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props =>
        <ConnectedRedirectingComponent {...props} component={Component} />
    } />
);
