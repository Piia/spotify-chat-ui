import React, { Fragment, Component } from 'react';

import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import {
    addMessage,
    getChatHistory,
    getChatters,
    addChatter,
    removeChatter,
} from 'redux/chat/chat';

const withChatClient = WrappedComponent => {
    class ChatClient extends Component {
        clientRef = null;

        onConnect = () => {};

        componentDidUpdate(prevProps) {
            if (
                this.props.trackId !== null &&
                this.props.trackId !== prevProps.trackId
            ) {
                this.props.getChatHistory(this.props.trackId);
                this.props.getChatters(this.props.trackId);
            }
        }

        sendChatMessage = message => {
            if (!this.props.trackId) return;

            this.clientRef.sendMessage(
                `/app/chat/${this.props.trackId}`,
                JSON.stringify({ body: message })
            );
        };

        onMessage = (message, topic) => {
            const subscriptionsTopic = `/topic/${this.props.trackId}.subscriptions`;
            const messagesTopic = `/topic/${this.props.trackId}.messages`;

            // dispatch based on topic
            ({
                [messagesTopic]: this.onChatMessage,
                [subscriptionsTopic]: this.onChatSubscriptionEvent,
            }[topic](message));
        };

        onChatMessage = message => {
            this.props.addMessage(message);
        };

        onChatSubscriptionEvent = event => {
            //TODO move to dispatcher? - maybe one dispatcher chatSubscriptionEvent ?

            const EVENT_SUBSCRIBE = 'SUBSCRIBE';
            const EVENT_UNSUBSCRIBE = 'UNSUBSCRIBE';
            const EVENT_DISCONNECT = 'DISCONNECT';

            ({
                [EVENT_SUBSCRIBE]: userId => this.props.addChatter(userId),
                [EVENT_UNSUBSCRIBE]: userId => this.props.removeChatter(userId),
                [EVENT_DISCONNECT]: userId => this.props.removeChatter(userId),
            }[event.eventType](event.userId));
        };

        render() {
            return (
                <Fragment>
                    <SockJsClient
                        url={`${process.env.REACT_APP_BACKEND_BASEPATH}/chat`}
                        topics={[
                            `/topic/${this.props.trackId}.subscriptions`,
                            `/topic/${this.props.trackId}.messages`,
                        ]}
                        onMessage={this.onMessage}
                        onConnect={this.onConnect}
                        ref={client => {
                            this.clientRef = client;
                        }}
                    />
                    <WrappedComponent
                        sendChatMessage={this.sendChatMessage}
                        {...this.props}
                    />
                </Fragment>
            );
        }
    }

    const mapStateToProps = state => ({
        trackId:
            state.playback.playback &&
            state.playback.playback.currentTrack &&
            state.playback.playback.currentTrack.id,
        userId:
            state.profile &&
            state.profile.profileData &&
            state.profile.profileData.id,
    });

    const mapDispatchToProps = dispatch => ({
        addMessage: message => dispatch(addMessage(message)),
        getChatHistory: trackId => dispatch(getChatHistory(trackId)),
        getChatters: trackId => dispatch(getChatters(trackId)),
        addChatter: userId => dispatch(addChatter(userId)),
        removeChatter: userId => dispatch(removeChatter(userId)),
    });

    const ConnectedChatClient = connect(
        mapStateToProps,
        mapDispatchToProps
    )(ChatClient);

    return ConnectedChatClient;
};

export default withChatClient;
