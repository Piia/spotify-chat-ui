import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

export class MainPage extends PureComponent {

    componentDidMount() {
        this.props.loadProfile();
        this.props.updatePlaybackState();
    }

    render() {
        return (
            <Fragment>
                <NavBar />
                <MainContent>
                    <SearchPanel />
                    <Wrapper>
                        <PlaybackPanel />
                        <Chat />
                    </Wrapper>
                </MainContent>
            </Fragment>
        );
    }
}

MainPage.propTypes = {
    loadProfile: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
    loadProfile: () => dispatch(loadProfile()),
    updatePlaybackState: () => dispatch(updatePlaybackState())
});
const connector = connect(null, mapDispatchToProps);

export default connector(withRouter(MainPage));
