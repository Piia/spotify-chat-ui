import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { store, ACTIONS } from 'redux/Store';

import SpotifyClient from 'spotify_client/SpotifyClient'


class LoginLandingPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        SpotifyClient.postAuthenticate(this.props.authorizationCode).then(tokenLifeTime => {
            store.dispatch( { type: ACTIONS.LOG_IN } )
            const mainPageUrl = "/chat";
            this.props.history.push(mainPageUrl);
        });
    }

    render() {
        return (<div>Logging in...</div>);
    }

}

export default withRouter(LoginLandingPage);
