import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SpinnerPage from 'components/Spinner/SpinnerPage';
import { login } from 'redux/login/login';


export class LoginLandingPage extends PureComponent {
    componentDidMount() {
        const { login, authorizationCode, history } = this.props;

        login(authorizationCode)
            .then(() => {
                const mainPageUrl = "/chat";
                history.push(mainPageUrl);
            });
    }

    render() {
        return <SpinnerPage />;
    }
}

LoginLandingPage.propTypes = {
    login: PropTypes.func.isRequired,
    authorizationCode: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    login: (authorizationCode) => dispatch(login(authorizationCode))
});

export default connect(null, mapDispatchToProps)(withRouter(LoginLandingPage));
