import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navigation = styled.nav`
    height: 50px;
    display: block;
    position: relative;
    background-color: ${props => props.theme.colors.voodoo};
`;
Navigation.displayName = 'Navigation';

const NavList = styled.ul`
    display: flex;
    justify-content: flex-end;
    padding: 1em;
`;
NavList.displayName = 'NavList';

const NavItem = styled.li`
    display: inline;
    color: ${props => props.theme.colors.magnolia};

    &:hover {
        background-color: ${props => props.theme.colors.outerSpace};
    }
`;
NavItem.displayName = 'NavItem';

class NavBar extends PureComponent {
    render() {
        const { profile } = this.props;

        return (
            <Navigation>
                <NavList>
                    <NavItem right>{ profile && profile.displayName }</NavItem>
                </NavList>
            </Navigation>
        );
    }
}

NavBar.propTypes = {
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile.profileData
});

export default connect(mapStateToProps)(NavBar);
