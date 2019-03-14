import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginLandingPage from 'containers/LoginLandingPage/LoginLandingPage';
import LoginPage from 'components/LoginPage/LoginPage';
import MainPage from 'containers/MainPage/MainPage';

import { store } from 'redux/Store';


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
