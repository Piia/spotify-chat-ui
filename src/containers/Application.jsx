import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/Store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

import LoginLandingPage from 'containers/LoginLandingPage/LoginLandingPage';
import LoginPage from 'components/LoginPage/LoginPage';
import MainPage from 'containers/MainPage/MainPage';
import { theme } from 'styles/theme';


class Application extends PureComponent {
    
    getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }

    render() {
        return (
            <Provider store={store} >
                <ThemeProvider theme={theme}>
                    <Router>
                        <div>
                            <Route exact path="/" component={LoginPage} />
                            <Route path="/chat" component={MainPage} />
                            <Route path="/callback/spotify-auth" render={(props) => <LoginLandingPage {...props} authorizationCode={this.getAuthorizationCode()} />} />
                        </div>
                    </Router>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default Application;
