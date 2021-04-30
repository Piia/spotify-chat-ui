import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';
import {
    addMessage,
    getChatHistory,
    getChatters,
    addChatter,
    removeChatter,
} from 'redux/chat/chat';

const useChatClient = () => {
    const clientRef = React.useRef();

    const trackId = useSelector(
        state => state.playback.playback?.currentTrack?.id
    );

    const dispatch = useDispatch();

    const onConnect = React.useCallback(() => {}, []);

    React.useEffect(() => {
        if (trackId) {
            dispatch(getChatHistory(trackId));
            dispatch(getChatters(trackId));
        }
    }, [trackId]); // eslint-disable-line react-hooks/exhaustive-deps

    const sendChatMessage = React.useCallback(
        message => {
            if (!trackId || !clientRef.current) return;

            clientRef.current.sendMessage(
                `/app/chat/${trackId}`,
                JSON.stringify({ body: message })
            );
        },
        [trackId]
    );

    const onChatSubscriptionEvent = React.useCallback(
        event => {
            //TODO move to dispatcher? - maybe one dispatcher chatSubscriptionEvent ?

            const EVENT_SUBSCRIBE = 'SUBSCRIBE';
            const EVENT_UNSUBSCRIBE = 'UNSUBSCRIBE';
            const EVENT_DISCONNECT = 'DISCONNECT';

            ({
                [EVENT_SUBSCRIBE]: userId => dispatch(addChatter(userId)),
                [EVENT_UNSUBSCRIBE]: userId => dispatch(removeChatter(userId)),
                [EVENT_DISCONNECT]: userId => dispatch(removeChatter(userId)),
            }[event.eventType](event.userId));
        },
        [dispatch]
    );

    const onMessage = React.useCallback(
        (message, topic) => {
            const subscriptionsTopic = `/topic/${trackId}.subscriptions`;
            const messagesTopic = `/topic/${trackId}.messages`;

            // TODO: ANYTHING!!!!

            // dispatch based on topic
            ({
                [messagesTopic]: message => dispatch(addMessage(message)),
                [subscriptionsTopic]: onChatSubscriptionEvent,
            }[topic](message));
        },
        [trackId, dispatch, onChatSubscriptionEvent]
    );

    const ClientComponent = () => (
        <SockJsClient
            url={`${process.env.REACT_APP_BACKEND_BASEPATH}/chat`}
            topics={[
                `/topic/${trackId}.subscriptions`,
                `/topic/${trackId}.messages`,
            ]}
            onMessage={onMessage}
            onConnect={onConnect}
            ref={clientRef}
        />
    );

    return [sendChatMessage, ClientComponent];
};

export default useChatClient;
