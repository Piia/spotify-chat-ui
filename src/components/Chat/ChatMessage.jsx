import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
`;
Container.displayName = 'Container';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
`;


const ChatMessage = props => {
    return (
        <Container>
            <BasicText>Hello Chat!</BasicText>
            <BasicText>{ props.message }</BasicText>
        </Container>
    );
};


export default ChatMessage;
