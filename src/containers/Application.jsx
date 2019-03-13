import React, { PureComponent, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SpotifyClient from "spotify_client/SpotifyClient"

import Page from 'components/Page/Page';
import NavBar from 'containers/NavBar/NavBar';
import LoginLandingPage from 'containers/LoginLandingPage/LoginLandingPage';
import LoginPage from 'components/LoginPage/LoginPage';

import { store } from 'redux/Store';

function MainPage(props) {
    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <NavBar />
                <Page />
            </Fragment>
        </ThemeProvider>
    );
}


class Application extends PureComponent {
    componentDidMount() {

    }

    getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }

    render() {
        return (
            <Provider store={store} >
                <Router>
                    <div>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/chat" component={MainPage} />
                        <Route path="/callback/spotify-auth" render={(props) => <LoginLandingPage {...props} authorizationCode={this.getAuthorizationCode()} />} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Application;
