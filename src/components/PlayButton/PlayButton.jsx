import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const Play = styled.button`
    background-color: ${props => props.theme.colors.cosmic};
    border-radius: 50%;
    border: 10px solid ${props => props.theme.colors.black};
    box-sizing: content-box;
    text-align: center;
    display: inline-block;
    padding: 0 0 0.2rem 0.35rem;

    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    color: ${props => props.theme.colors.black};
`;

const Pause = styled.button`
    background-color: ${props => props.theme.colors.cosmic};
    border-radius: 50%;
    border: 10px solid ${props => props.theme.colors.black};
    box-sizing: content-box;
    text-align: center;
    display: inline-block;
    padding: 0 0 0.2rem;

    width: 3rem;
    height: 3rem;
    font-size: 1.75rem;
    color: ${props => props.theme.colors.black};
`;

const playIcon = '▶';
const pauseIcon = '▮▮';

class PlayButton extends PureComponent {
    render() {
        return (this.props.isPlaying ?
            <Pause>{ pauseIcon }</Pause> : 
            <Play>{ playIcon }</Play>
        );
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playback.playback.isPlaying
});

export default connect(mapStateToProps)(PlayButton);