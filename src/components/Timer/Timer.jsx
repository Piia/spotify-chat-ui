import React from 'react';
import PropTypes from 'prop-types';
import { format } from './utils';

const Timer = ({ isPlaying, progressMillis }) => {
    const [time, setTime] = React.useState(0);

    const timerRef = React.useRef(null);

    const setTimer = () => {
        timerRef.current = setInterval(incrementTime, 1000);
    };

    const clearTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const incrementTime = () => {
        setTime(oldTime => oldTime + 1000);
    };

    const setTimeTo = millis => {
        setTime(millis);
    };

    React.useEffect(() => {
        clearTimer();
    }, []);

    React.useEffect(() => {
        setTimeTo(progressMillis);
    }, [progressMillis]);

    React.useEffect(() => {
        if (!timerRef.current && isPlaying) {
            setTimer();
        } else if (timerRef.current && !isPlaying) {
            clearTimer();
        }
    }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    return format(time);
};

export default Timer;

Timer.defaultProps = {
    isPlaying: false,
    progressMillis: 0,
};

Timer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    progressMillis: PropTypes.number.isRequired,
};
