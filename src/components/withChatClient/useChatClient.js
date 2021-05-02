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

const CHAT_URL = `${process.env.REACT_APP_BACKEND_BASEPATH}/chat`;

const EVENT_TYPE = {
    SUBSCRIBE: 'SUBSCRIBE',
    UNSUBSCRIBE: 'UNSUBSCRIBE',
    DISCONNECT: 'DISCONNECT',
};

const useChatClient = () => {
    const clientRef = React.useRef();

    const trackId = useSelector(
        state => state.playback.playback?.currentTrack?.id
    );

    const chatTopics = React.useMemo(
        () => ({
            SUBSCRIPTIONS: `/topic/${trackId}.subscriptions`,
            MESSAGES: `/topic/${trackId}.messages`,
        }),
        [trackId]
    );

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (trackId) {
            dispatch(getChatHistory(trackId));
            dispatch(getChatters(trackId));
        }
    }, [trackId]); // eslint-disable-line react-hooks/exhaustive-deps

    const sendChatMessage = React.useCallback(
        message => {
            if (trackId && clientRef.current) {
                clientRef.current.sendMessage(
                    `/app/chat/${trackId}`,
                    JSON.stringify({ body: message })
                );
            }
        },
        [trackId]
    );

    const onChatSubscriptionEvent = React.useCallback(
        event => {
            if (event.eventType === EVENT_TYPE.SUBSCRIBE) {
                dispatch(addChatter(event.userId));
            } else if (
                event.eventType === EVENT_TYPE.UNSUBSCRIBE ||
                event.eventType === EVENT_TYPE.DISCONNECT
            ) {
                dispatch(removeChatter(event.userId));
            }
        },
        [dispatch]
    );

    const onMessage = React.useCallback(
        (message, topic) => {
            if (topic === chatTopics.MESSAGES) {
                dispatch(addMessage(message));
            } else if (topic === chatTopics.SUBSCRIPTIONS) {
                onChatSubscriptionEvent(message);
            }
        },
        [chatTopics, dispatch, onChatSubscriptionEvent]
    );

    const onConnect = React.useCallback(() => {}, []);

    const ClientComponent = () => (
        <SockJsClient
            url={CHAT_URL}
            topics={Object.values(chatTopics)}
            onMessage={onMessage}
            onConnect={onConnect}
            ref={clientRef}
        />
    );

    return [sendChatMessage, ClientComponent];
};

export default useChatClient;
