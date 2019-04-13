import React, { Fragment, PureComponent, Component } from 'react';
import styled from 'styled-components';

import SockJsClient from 'react-stomp';

const Container = styled.article`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
`;
Container.displayName = 'Container';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
`;


class MessageListener extends Component {

    clientRef = null;

    onConnect = () => {
        console.log("Connected!");
        console.log(this.clientRef);

        this.clientRef.sendMessage(
            "/app/chat",
            JSON.stringify({body: "Hello chat"})
        );
    }

    render() {
        return (
            <SockJsClient url='http://localhost:8080/api/v1/chat' topics={['/topic/messages']}
                onMessage={ (msg) => { console.log(msg); } }
                onConnect={ this.onConnect } 
                ref={ client => { this.clientRef = client; console.log(client) }} />
        );
    }

}

class Chat extends PureComponent {

    render() {
        return (
            <Fragment>
                <MessageListener />
                <Container>
                    <BasicText>Hello Chat!</BasicText>
                </Container>
            </Fragment>
        );
    }
}

export default Chat;
