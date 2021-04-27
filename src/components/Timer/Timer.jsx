import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from './utils';

class Timer extends PureComponent {
    state = {
        time: 0,
    };

    timerRef = null;

    componentWillUnmount() {
        this.clearTimer();
    }

    componentDidUpdate(prevProps) {
        const { isPlaying, progressMillis } = this.props;

        if (progressMillis !== prevProps.progressMillis) {
            this.setTimeTo(progressMillis);
        }

        if (!this.timerRef && isPlaying) {
            this.setTimer();
        } else if (this.timerRef && !isPlaying) {
            this.clearTimer();
        }
    }

    setTimer = () => {
        this.timerRef = setInterval(() => {
            this.incrementTime();
        }, 1000);
    };

    clearTimer = () => {
        clearInterval(this.timerRef);
        this.timerRef = null;
    };

    incrementTime = () => {
        this.setState(oldState => ({ time: oldState.time + 1000 }));
    };

    setTimeTo = millis => {
        this.setState({ time: millis });
    };

    render() {
        return format(this.state.time);
    }
}

export default Timer;

Timer.defaultProps = {
    isPlaying: false,
    progressMillis: 0,
};

Timer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    progressMillis: PropTypes.number.isRequired,
};
