import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RedirectToComponent = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state => state.login.loggedIn);
    return loggedIn === true ? <Component {...rest} /> : <Redirect to={'/'} />;
};

export default RedirectToComponent;
