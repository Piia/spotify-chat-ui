import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import SockJsClient from 'react-stomp';

import { addMessage, getChatHistory } from 'redux/chat/chat';


const withChatClient = WrappedComponent => {

    class ChatClient extends Component {

        clientRef = null;

        onConnect = () => {
            this.props.getChatHistory();
        }

        sendChatMessage = message => {
            this.clientRef.sendMessage(
                "/app/chat",
                JSON.stringify({body: message})
            );
        };

        onMessage = message => {
            console.log(message);
            this.props.addMessage(message); 
        };

        render() {
            return (
                <Fragment>
                    <SockJsClient
                        url={`${process.env.REACT_APP_BACKEND_BASEPATH}/chat`}
                        topics={['/topic/messages']}
                        onMessage={ this.onMessage }
                        onConnect={ this.onConnect } 
                        ref={ client => { this.clientRef = client; console.log(client) }}
                    />
                    <WrappedComponent sendChatMessage={ this.sendChatMessage } { ...this.props } />
                </Fragment>
            );
        }
    }
    
    
    const mapDispatchToProps = dispatch => ({
        addMessage: message => dispatch(addMessage(message)),
        getChatHistory: () => dispatch(getChatHistory())
    });
    
    
    const ConnectedChatClient = connect(null, mapDispatchToProps)(ChatClient);

    return ConnectedChatClient;

};

export default withChatClient;