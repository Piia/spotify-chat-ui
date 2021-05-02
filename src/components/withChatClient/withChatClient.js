import React from 'react';

import useChatClient from './useChatClient';

const withChatClient = WrappedComponent => {
    const ChatClient = props => {
        const [sendChatMessage, ClientComponent] = useChatClient();

        return (
            <>
                <ClientComponent />
                <WrappedComponent
                    sendChatMessage={sendChatMessage}
                    {...props}
                />
            </>
        );
    };

    return ChatClient;
};

export default withChatClient;
