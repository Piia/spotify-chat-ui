import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.voodoo};
`;

class Page extends PureComponent {

    render() {
        const { loggedIn } = this.props;

        if(!loggedIn) {
            return <div>Logging in (i wanna be a spinner)...</div>;
        } else {
            return <BasicText>Hello Page!</BasicText>;
        }
    }
}

Page.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default Page;
