import React from 'react';
import { Route } from 'react-router-dom';
import RedirectToComponent from './RedirectToComponent';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <RedirectToComponent {...props} component={Component} />
        )}
    />
);

export default AuthenticatedRoute;
