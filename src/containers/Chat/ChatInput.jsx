import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ChatTextArea from './ChatTextArea';

const SubmitButton = styled.button`
    height: 5rem;
    width: 7rem;
    background-color: ${props => props.theme.colors.outerSpace};
    border: 1px solid ${props => props.theme.colors.black};
    border-left-width: 0;
    color: ${props => props.theme.colors.varden};
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.bold};
    font-stretch: normal;
    text-transform: uppercase;

    &:hover {
        color: ${props => props.theme.colors.leather};
        cursor: pointer;
    }
`;
SubmitButton.displayName = 'SubmitButton';

const Container = styled.section`
    padding-right: ${props => props.theme.spacing.md};
    height: 7rem;
    display: flex;
    align-items: center;
`;
Container.displayName = 'Container';

const PROPERTY_NAME = 'chatMessage';

const ChatInput = ({ sendChatMessage }) => {
    const [model, setModel] = React.useState({});

    const handleInputChange = (property, value) => {
        setModel(oldModel => ({ ...oldModel, [property]: value }));
    };

    const submitMessage = () => {
        const chatMessage = model[PROPERTY_NAME];

        if (chatMessage && chatMessage.length > 0) {
            setModel(oldModel => ({ ...oldModel, [PROPERTY_NAME]: '' }));
            sendChatMessage(chatMessage);
        }
    };

    return (
        <Container>
            <ChatTextArea
                onChange={handleInputChange}
                property={PROPERTY_NAME}
                model={model}
            />
            <SubmitButton onClick={submitMessage}>Send</SubmitButton>
        </Container>
    );
};

ChatInput.propTypes = {
    sendChatMessage: PropTypes.func.isRequired,
};

export default ChatInput;
