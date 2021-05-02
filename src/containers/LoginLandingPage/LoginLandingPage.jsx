import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import SpinnerPage from 'components/Spinner/SpinnerPage';
import { login } from 'redux/login/login';

const LoginLandingPage = ({ authorizationCode }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        dispatch(login(authorizationCode)).then(() => {
            const mainPageUrl = '/chat';
            history.push(mainPageUrl);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <SpinnerPage />;
};

LoginLandingPage.propTypes = {
    authorizationCode: PropTypes.string.isRequired,
};

export default LoginLandingPage;
