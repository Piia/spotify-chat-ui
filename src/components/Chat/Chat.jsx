import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const Container = styled.article`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
`;
Container.displayName = 'Container';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.verda};
`;

class Chat extends PureComponent {

    render() {
        return (
            <Container>
                <BasicText>Hello Chat!</BasicText>
            </Container>
        );
    }
}

export default Chat;
