import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from 'redux/login/login';


class LoginLandingPage extends Component {
    componentDidMount() {
        this.props.login(this.props.authorizationCode).then(() => {
            const mainPageUrl = "/chat";
            this.props.history.push(mainPageUrl);
        });
    }

    render() {
        return (<div>Logging in...</div>);
    }
}

const mapDispatchToProps = dispatch => ({
    login: (authorizationCode) => dispatch(login(authorizationCode))
});

export default connect(null, mapDispatchToProps)(withRouter(LoginLandingPage));
