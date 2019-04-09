import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from './utils';

class Timer extends PureComponent {
    state = {
        time: 0
    }

    timerRef = null;

    componentWillUnmount() {
        this.clearTimer();
    }

    componentDidUpdate(prevProps) {
        const { isPlaying, progressMillis } = this.props;

        if (!this.timerRef && isPlaying) {
            this.setTimer();
        }
        else if (this.timerRef && !isPlaying) {
            this.clearTimer();
        }
        else if (progressMillis !== prevProps.progressMillis) {
            this.setTimeTo(progressMillis);
        }
    }

    setTimer = () => {
        this.timerRef = setInterval(() => { this.incrementTime(); }, 1000);
    }

    clearTimer = () => {
        clearInterval(this.timerRef);
    }

    incrementTime = () => {
        this.setState(oldState => ({ time: oldState.time + 1000 }));
    }

    setTimeTo = millis => {
        this.setState(oldState => ({ time: millis }));
    }

    render() {
        return <span>{ format(this.state.time) }</span>;
    }
}

export default Timer;

Timer.defaultProps = {
    isPlaying: false,
    progressMillis: 0,
};

Timer.propTypes = {
    isPlaying: PropTypes.bool,
    progressMillis: PropTypes.number,
};
