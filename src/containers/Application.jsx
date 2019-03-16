import React, { PureComponent, Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/Store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import LoginLandingPage from 'containers/LoginLandingPage/LoginLandingPage';
import LoginPage from 'components/LoginPage/LoginPage';
import MainPage from 'containers/MainPage/MainPage';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';

import AuthenticatedRoute from 'containers/AuthenticatedRoute/AuthenticatedRoute';

class Application extends PureComponent {
    
    getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }

    render() {
        return (
            <Provider store={store} >
                <ThemeProvider theme={theme}>
                    <Fragment>
                        <GlobalStyle />
                        <Router>
                            <div>
                                <Route exact path="/" component={LoginPage} />
                                <AuthenticatedRoute path="/chat" component={MainPage} />
                                <Route path="/callback/spotify-auth" render={(props) => <LoginLandingPage {...props} authorizationCode={this.getAuthorizationCode()} />} />
                            </div>
                        </Router>
                    </Fragment>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default Application;
