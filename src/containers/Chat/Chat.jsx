import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ChatMessage from 'components/Chat/ChatMessage';
import withChatClient from 'components/withChatClient/withChatClient';

const Container = styled.article`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
`;
Container.displayName = 'Container';


class Chat extends PureComponent {
    
    componentDidMount() {

        setTimeout(() => {
            this.props.sendChatMessage("Hei maailma");   
        }, 2000);     
    }

    render() {
        return (
            <Container>
                {this.props.chatMessages.map(message => <ChatMessage message={message} />)}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    chatMessages: state.chat.messages
});

const connector = connect(mapStateToProps);

export default withChatClient(connector(Chat));
