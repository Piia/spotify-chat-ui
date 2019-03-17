import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from 'components/Spinner/Spinner';
import { checkLogin, refreshAccessToken } from 'redux/login/login';

class LoginChecker extends Component {
    // refresh every 15 minutes
    static REFRESH_TIMER_INTERVAL = 9000000;
    
    // when we see token lifetime below this, we refresh immediately
    // 1000 seconds ~ 16 minutes
    static MUST_REFRESH_NOW_THRESHOLD = 1000;

    refreshInterval = null

    setRefreshInterval() {
        this.refreshInterval = setInterval(
            this.props.refreshAccessToken, 
            LoginChecker.REFRESH_TIMER_INTERVAL
        );
    }

    componentDidMount() {
        this.props.checkLogin();
    }
    
    componentWillUnmount() {
        if(this.refreshInterval !== null) {
            clearInterval(this.refreshInterval);
        } 
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.loggedIn && this.props.loggedIn) {
            this.refreshInterval = this.setRefreshInterval();
            if(this.props.tokenExpiresIn < LoginChecker.MUST_REFRESH_NOW_THRESHOLD) {
                this.props.refreshAccessToken()
            }
        } else if(prevProps.loggedIn && !this.props.loggedIn) {
            clearInterval(this.refreshInterval);
        }
    }

    render() {
        if(this.props.checkingLogin) {
            return <Spinner />
        } else {
            return this.props.children;
        }
    }
}


const mapDispatchToProps = dispatch => ({
    checkLogin: () => dispatch(checkLogin()),
    refreshAccessToken: () => dispatch(refreshAccessToken())
});

const mapStateToProps = state => ({
    checkingLogin: state.login.checkingLogin,
    loggedIn: state.login.loggedIn,
    tokenExpiresIn: state.login.tokenExpiresIn
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker);