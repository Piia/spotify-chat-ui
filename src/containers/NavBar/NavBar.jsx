import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navigation = styled.nav`
    height: 50px;
    display: block;
    position: relative;
    background-color: ${props => props.theme.colors.outerSpace};
    border-bottom: 1px solid ${props => props.theme.colors.black};
`;
Navigation.displayName = 'Navigation';

const NavList = styled.ul`
    padding: 1em;
`;
NavList.displayName = 'NavList';

const NavItem = styled.li`
    display: inline-block;
    color: ${props => props.theme.colors.magnolia};
    float: ${props => props.right && 'right'};

    &:hover {
        background-color: ${props => props.theme.colors.outerSpace};
    }
`;
NavItem.displayName = 'NavItem';

const Header = styled.header`
    // display: inline;
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.magnolia};
`;
Header.displayName = 'Header';

class NavBar extends PureComponent {
    render() {
        const { profile } = this.props;

        return (
            <Navigation>
                <NavList>
                    <NavItem><Header>Spotify chat</Header></NavItem>
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
