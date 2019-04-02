import React, { PureComponent } from 'react';
import { format } from './utils';

class Timer extends PureComponent {
    state = {
        time: 0
    }
    timerRef = null;

    componentDidMount() {
        // this.setTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timerRef);
    }

    componentDidUpdate() {
        if (!this.timerRef && this.props.isPlaying) {
            this.setTimer();
        } else if (this.timerRef && !this.props.isPlaying) {
            clearInterval(this.timerRef);
        }
    }

    setTimer = () => {
        this.timerRef = setInterval(() => {
            this.setState(oldState => ({ time: oldState.time + 1000 }))
        }, 1000)
    }

    render() {
        return <span>{ format(this.state.time) }</span>;
    }
}

export default Timer;
