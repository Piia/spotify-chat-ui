import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Chat from 'containers/Chat/Chat';
import NavBar from 'containers/NavBar/NavBar';
import SearchPanel from 'containers/SearchPanel/SearchPanel';

import { loadProfile } from 'redux/profile/profile';
import { updatePlaybackState } from 'redux/playback/playback';
import PlaybackPanel from 'containers/PlaybackPanel/PlaybackPanel';

const MainContent = styled.section`
    display: flex;
`;
MainContent.displayName = 'MainContent';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
`;
Wrapper.displayName = 'Wrapper';

const MainPage = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(loadProfile());
        dispatch(updatePlaybackState());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <NavBar />
            <MainContent>
                <SearchPanel />
                <Wrapper>
                    <PlaybackPanel />
                    <Chat />
                </Wrapper>
            </MainContent>
        </>
    );
};

export default MainPage;
