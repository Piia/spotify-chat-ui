import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ChatMessage from 'components/Chat/ChatMessage';
import withChatClient from 'components/withChatClient/withChatClient';


const MessageContainer = styled.article`
    padding: 0 ${props => props.theme.spacing.xl};
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 6rem);
`;
MessageContainer.displayName = 'Container';

const ChatSection = styled.section`
    height: calc(100vh - 130px - 50px);
    max-height: calc(100vh - 130px - 50px);
    min-height: calc(100vh - 130px - 50px);
`;
ChatSection.displayName = 'ChatSection';


const InputTextArea = styled.textarea`
    height: 5rem;
    max-height: 5rem;
    min-height: 5rem; 
    width: 75%;
    max-width: 75%;
    min-width: 75%;
    resize: none;
    padding: 0;
    box-sizing: border-box;
`;
InputTextArea.displayName = "InputTextArea";

const SubmitButton = styled.button`
    height: 5rem;
    width: 7rem;
`;
SubmitButton.displayName = "SubmitButton";

const Container = styled.section`
    height: 6rem;
    display: flex;
    align-items: center;
`;
Container.displayName = "Container";

const ChatTextArea = ({ model, property, onChange, onKeyPress, placeholder, disabled }) => {

    return (
        <InputTextArea
            value={ model && property && model[property] }
            onChange={ (event) => onChange(property, event.target.value) }
            onKeyPress={ onKeyPress }
            placeholder={ placeholder }
            disabled={ disabled }
            spellCheck="false"
        />
    );
};


class ChatInput extends PureComponent {
    state = {
        model: {}
    };

    property = 'chatMessage';

    handleInputChange = (property, value) => {
        this.setState(oldState => ({ model: { ...oldState.model, [property]: value } }))
    };

    submitMessage = () => {
        const chatMessage = this.state.model[this.property];

        if (chatMessage && chatMessage.length > 0) {
            this.setState(oldState => ({ model: { ...oldState.model, [this.property]: "" } }));
            this.props.sendChatMessage(chatMessage);
        };
    };

    render() {
        return (
            <Container>
                <ChatTextArea 
                    onChange={ this.handleInputChange }
                    property={ this.property }
                    model={ this.state.model }
                />
                <SubmitButton onClick={ this.submitMessage }>Send</SubmitButton>
            </Container>
        );
    }
}

class Chat extends PureComponent {
    messageContainerElement = null;

    componentDidUpdate() {
        this.messageContainerElement.scrollTop = this.messageContainerElement.scrollHeight;
    }

    render() {
        return (
            <ChatSection>
                <MessageContainer ref={ elem => { this.messageContainerElement = elem; } }>
                    {this.props.chatMessages.map(message =>
                        <ChatMessage message={message} key={message.id} />
                    )}
                </MessageContainer>
                <ChatInput sendChatMessage={ this.props.sendChatMessage } />
            </ChatSection>
        );
    }
}

const mapStateToProps = state => ({
    chatMessages: state.chat.messages
});

const connector = connect(mapStateToProps);

export default withChatClient(connector(Chat));
