import React, { PureComponent } from 'react';
import styled from 'styled-components';


const Navigation = styled.nav`
    display: block;
    position: relative;
    background-color: ${props => props.theme.colors.voodoo};
`;
Navigation.displayName = 'Navigation';

const NavList = styled.ul`
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
        return (
            <Navigation>
                <NavList>
                    <NavItem>Link 1</NavItem>
                    <NavItem>Link 2</NavItem>
                </NavList>
            </Navigation>
        );
    }
}

export default NavBar;
