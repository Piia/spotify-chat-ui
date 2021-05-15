import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';

import LoginChecker from 'containers/LoginChecker/LoginChecker';
import LoginLandingPage from 'containers/LoginLandingPage/LoginLandingPage';
import LoginPage from 'components/LoginPage/LoginPage';
import MainPage from 'containers/MainPage/MainPage';

import AuthenticatedRoute from 'containers/AuthenticatedRoute/AuthenticatedRoute';

const getAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
};

const Application = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Fragment>
                    <GlobalStyle />
                    <LoginChecker>
                        <Router>
                            <div>
                                <Route exact path="/" component={LoginPage} />
                                <AuthenticatedRoute
                                    path="/chat"
                                    component={MainPage}
                                />
                                <Route
                                    path="/callback/spotify-auth"
                                    render={props => (
                                        <LoginLandingPage
                                            {...props}
                                            authorizationCode={getAuthorizationCode()}
                                        />
                                    )}
                                />
                            </div>
                        </Router>
                    </LoginChecker>
                </Fragment>
            </ThemeProvider>
        </Provider>
    );
};

export default Application;
