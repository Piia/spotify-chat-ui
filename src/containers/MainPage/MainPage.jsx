import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Page from 'components/Page/Page';
import NavBar from 'containers/NavBar/NavBar';
import SearchPanel from 'containers/SearchPanel/SearchPanel';

import { loadProfile } from 'redux/profile/profile';


export class MainPage extends PureComponent {

    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        const { loggedIn } = this.props;

        return (
            <Fragment>
                <NavBar />
                <SearchPanel />
                <Page loggedIn={loggedIn} />
            </Fragment>
        );
    }
}

MainPage.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loadProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn
});
const mapDispatchToProps = dispatch => ({
    loadProfile: () => dispatch(loadProfile())
});
const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(withRouter(MainPage));
