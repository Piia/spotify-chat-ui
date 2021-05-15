import React, { ComponentType, FC } from 'react';

import { ChatMessage as MessageType } from 'components/Chat/Chat.types';
import useChatClient from './useChatClient';

export type SendChatMessage = (message: MessageType) => void;

type AdditionalProps = {
    sendChatMessage: SendChatMessage;
};

function withChatClient<P>(
    WrappedComponent: ComponentType<P & AdditionalProps>
): FC<P> {
    const ChatClient = (props: P) => {
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
}

export default withChatClient;
