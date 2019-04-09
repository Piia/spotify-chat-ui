import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { resume, pause } from 'redux/playback/playback';


const basicButtonStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
    font-size: 2rem;
    transition: background-color 0.2s ease-in;;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.magnolia};
    }
    &:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
    transition: background-color 0.2s ease-in;;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.magnolia};
    }
    &:focus {
        outline: none;
    }
`;
Button.displayName = 'Button';

const Play = styled.span`
    font-size: 1.75rem;
    padding: 2px 0 0 5px;
`;
Play.displayName = 'Play';

const Pause = styled.span`
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

    handlePause = event => {
        event.preventDefault();
        this.props.pause();
    };
    handleResume = event => {
        event.preventDefault();
        this.props.resume();
    };

    render() {
        const isPlaying = this.props.isPlaying;

        return (
            <Button onClick={ isPlaying ? this.handlePause : this.handleResume }>
                {isPlaying ? <Pause>{ pauseIcon }</Pause> : <Play>{ playIcon }</Play>}
            </Button>
        );
    };
};

const mapStateToProps = state => ({
    isPlaying: state.playback.playback.isPlaying
});
const mapDispatchToProps = dispatch => ({
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause())
})
const connected = connect(mapStateToProps, mapDispatchToProps);

export default connected(PlayButton);