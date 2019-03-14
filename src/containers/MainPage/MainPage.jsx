import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Page from 'components/Page/Page';
import NavBar from 'containers/NavBar/NavBar';
import { theme } from 'styles/theme';

import { loadProfile } from 'redux/profile/profile';


class MainPage extends Component {

    componentDidMount() {
       this.props.loadProfile();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Fragment>
                    <NavBar />
                    <Page />
                </Fragment>
            </ThemeProvider>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadProfile: () => dispatch(loadProfile())
});

export default connect(null, mapDispatchToProps)(withRouter(MainPage));

//export default MainPage;