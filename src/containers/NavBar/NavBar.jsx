import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

const Navigation = styled.nav`
    display: block;
    position: relative;
    background-color: ${props => props.theme.colors.voodoo};
`;
Navigation.displayName = 'Navigation';

const NavList = styled.ul`
    padding: 1em;
`;
NavList.displayName = 'NavList';

const NavItem = styled.li`
    display: inline;
    color: ${props => props.theme.colors.magnolia};
    float: ${props => props.right && 'right'};

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
                    <NavItem>Link 1</NavItem>
                    <NavItem>Link 2</NavItem>
                    <NavItem right>{profile&&profile.displayName}</NavItem>
                </NavList>
            </Navigation>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profileData
});

export default connect(mapStateToProps)(NavBar);
