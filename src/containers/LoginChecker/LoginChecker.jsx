import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin, refreshAccessToken } from 'redux/login/login';
import SpinnerPage from 'components/Spinner/SpinnerPage';

// refresh every 15 minutes
const REFRESH_TIMER_INTERVAL = 9000000;

// when we see token lifetime below this, we refresh immediately
// 1000 seconds ~ 16 minutes
const MUST_REFRESH_NOW_THRESHOLD = 1000;

const LoginChecker = ({ children }) => {
    const dispatch = useDispatch();
    const refreshInterval = React.useRef(null);

    const checkingLogin = useSelector(state => state.login.checkingLogin);
    const loggedIn = useSelector(state => state.login.loggedIn);
    const tokenExpiresIn = useSelector(state => state.login.tokenExpiresIn);

    const handleCheckLogin = () => dispatch(checkLogin());
    const handleRefreshAccessToken = () => dispatch(refreshAccessToken());

    const setRefreshInterval = () => {
        refreshInterval.current = setInterval(
            handleRefreshAccessToken,
            REFRESH_TIMER_INTERVAL
        );
    };

    React.useEffect(() => {
        handleCheckLogin();

        return () => {
            if (refreshInterval.current !== null) {
                clearInterval(refreshInterval.current);
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        if (loggedIn) {
            setRefreshInterval();
            if (tokenExpiresIn < MUST_REFRESH_NOW_THRESHOLD) {
                handleRefreshAccessToken();
            }
        } else {
            clearInterval(refreshInterval.current);
        }
    }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

    if (checkingLogin) {
        return <SpinnerPage />;
    } else {
        return children;
    }
};

export default LoginChecker;
