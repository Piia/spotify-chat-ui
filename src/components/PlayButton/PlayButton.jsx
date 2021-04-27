import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { resume, pause } from 'redux/playback/playback';

const Button = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    width: 3.5rem;
    height: 3.5rem;
    padding: 0;
    background-color: ${props => props.theme.colors.cosmic};
    border-radius: 50%;
    border: 10px solid ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.black};
    text-align: center;
    font-family: ${props => props.theme.font.family.arial};
    transition: background-color 0.2s ease-in;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.leather};
    }
    &:focus {
        outline: none;
    }
`;
Button.displayName = 'Button';

const Play = styled.div`
    font-size: 1.75rem;
    padding: 0 0 0 5px;
`;
Play.displayName = 'Play';

const Pause = styled.div`
    font-size: 1rem;
    padding: 0 0 0 5px;
`;
Pause.displayName = 'Pause';

const playIcon = '▶';
const pauseIcon = '▋▋';

class PlayButton extends PureComponent {
    state = {
        play: false,
    };

    componentDidMount() {
        this.resetPlay();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isPlaying !== prevProps.isPlaying) {
            this.resetPlay();
        }
    }

    resetPlay = () => {
        this.setState({ play: this.props.isPlaying });
    };

    togglePlay = () => {
        this.setState(oldState => ({ play: !oldState.play }));
    };

    handlePause = event => {
        event.preventDefault();
        this.togglePlay();
        this.props.pause();
    };
    handleResume = event => {
        event.preventDefault();
        this.togglePlay();
        this.props.resume();
    };

    render() {
        const isPlaying = this.state.play;

        return (
            <Button onClick={isPlaying ? this.handlePause : this.handleResume}>
                {isPlaying ? (
                    <Pause>{pauseIcon}</Pause>
                ) : (
                    <Play>{playIcon}</Play>
                )}
            </Button>
        );
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playback.playback.isPlaying,
});
const mapDispatchToProps = dispatch => ({
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause()),
});
const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(PlayButton);
