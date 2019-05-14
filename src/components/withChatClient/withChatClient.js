import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import SockJsClient from 'react-stomp';

import { addMessage, getChatHistory } from 'redux/chat/chat';


const withChatClient = WrappedComponent => {

    class ChatClient extends Component {

        clientRef = null;

        onConnect = () => {
        }

        componentDidUpdate(prevProps) {
            if(this.props.trackId !== null && this.props.trackId !== prevProps.trackId) {
                this.props.getChatHistory(this.props.trackId);
            }
        }

        sendChatMessage = message => {
            if(!this.props.trackId) return;

            this.clientRef.sendMessage(
                `/app/chat/${this.props.trackId}`,
                JSON.stringify({body: message})
            );
        };

        onMessage = message => {
            this.props.addMessage(message); 
        };

        render() {
            return (
                <Fragment>
                    <SockJsClient
                        url={`${process.env.REACT_APP_BACKEND_BASEPATH}/chat`}
                        topics={[`/topic/${this.props.trackId}/messages`]}
                        onMessage={ this.onMessage }
                        onConnect={ this.onConnect } 
                        ref={ client => { this.clientRef = client }}
                    />
                    <WrappedComponent sendChatMessage={ this.sendChatMessage } { ...this.props } />
                </Fragment>
            );
        }
    }
    
    const mapStateToProps = state => ({
        trackId: state.playback.playback && state.playback.playback.currentTrack && state.playback.playback.currentTrack.id
    });
    
    const mapDispatchToProps = dispatch => ({
        addMessage: message => dispatch(addMessage(message)),
        getChatHistory: trackId => dispatch(getChatHistory(trackId))
    });
    
    
    const ConnectedChatClient = connect(mapStateToProps, mapDispatchToProps)(ChatClient);

    return ConnectedChatClient;

};

export default withChatClient;