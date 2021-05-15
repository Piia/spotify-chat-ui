import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { resume, pause } from 'store/playback/playback';

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

const PlayButton = () => {
    const [play, setPlay] = React.useState(false);
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.playback.playback.isPlaying);

    React.useEffect(() => {
        if (isPlaying !== play) {
            setPlay(isPlaying);
        }
    }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    const togglePlay = () => {
        setPlay(oldState => !oldState);
    };

    const handlePause = event => {
        event.preventDefault();
        togglePlay();
        dispatch(pause());
    };

    const handleResume = event => {
        event.preventDefault();
        togglePlay();
        dispatch(resume());
    };

    return (
        <Button onClick={play ? handlePause : handleResume}>
            {play ? <Pause>{pauseIcon}</Pause> : <Play>{playIcon}</Play>}
        </Button>
    );
};

export default PlayButton;
