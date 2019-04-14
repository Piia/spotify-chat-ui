import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.section`
    // padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    border-bottom: 1px dashed ${props => props.theme.colors.strikemaster};
`;
Container.displayName = 'Container';

const Title = styled.p`
    font-family: ${props => props.theme.font.family.arial};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
    margin: 0;
    margin-top: ${props => props.theme.spacing.md};
`;

const Message = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
`;


const ChatMessage = ({ message }) => {
    return (
        <Container>
            <Title>{ message.userId } - { moment(message.timestamp).local().calendar() }</Title>
            <Message>{ message.body }</Message>
        </Container>
    );
};


export default ChatMessage;
