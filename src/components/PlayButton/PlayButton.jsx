import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { resume, pause } from 'redux/playback/playback';

const buttonHover = css`
    transition: background-color 0.2s ease-in;;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.magnolia};
    }
`;

export const StyledPlayButton = styled.button`
    ${buttonHover}

    background-color: ${props => props.theme.colors.cosmic};
    border-radius: 50%;
    border: 10px solid ${props => props.theme.colors.black};
    box-sizing: content-box;
    text-align: center;
    display: inline-block;
    padding: 0 0 0.2rem 0.35rem;

    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
    color: ${props => props.theme.colors.black};
`;

export const StyledPauseButton = styled.button`
    ${buttonHover}

    background-color: ${props => props.theme.colors.cosmic};
    border-radius: 50%;
    border: 10px solid ${props => props.theme.colors.black};
    box-sizing: content-box;
    text-align: center;
    display: inline-block;
    padding: 0 0.175rem 0.2rem 0.175rem;

    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.75rem;
    color: ${props => props.theme.colors.black};
`;

const playIcon = '▶';
const pauseIcon = '▮▮';

class PlayButton extends PureComponent {
    render() {
        return (this.props.isPlaying ?
            <StyledPauseButton onClick={this.props.pause}>{ pauseIcon }</StyledPauseButton> : 
            <StyledPlayButton onClick={this.props.resume}>{ playIcon }</StyledPlayButton>
        );
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playback.playback.isPlaying
});

const mapDispatchToProps = dispatch => ({
    resume: () => dispatch(resume()),
    pause: () => dispatch(pause())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);