import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ChatMessage from 'components/Chat/ChatMessage';
import ChatSubscriber from 'components/Chat/ChatSubscriber';
import withChatClient from 'components/withChatClient/withChatClient';
import ChatInput from './ChatInput';

const MessageContainer = styled.article`
    padding: ${props => props.theme.spacing.xs};
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${props => props.theme.colors.outerSpace};
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors.black};
    height: 100%;
    width: 100%;
`;
MessageContainer.displayName = 'Container';

const ChatSection = styled.section`
    height: calc(100vh - 130px - 50px);
    max-height: calc(100vh - 130px - 50px);
    min-height: calc(100vh - 130px - 50px);
    background-color: ${props => props.theme.colors.voodoo};
`;
ChatSection.displayName = 'ChatSection';

const ChatterList = styled.section`
    width: 15em;
    padding: 1em;
`;
ChatterList.displayName = 'ChatterList';

const ChatterListHeading = styled.h3``;
ChatterListHeading.displayName = 'ChatterListHeading';

const HorizontalWrapper = styled.section`
    height: calc(100% - 7rem);
    display: flex;
`;
HorizontalWrapper.displayName = 'HorizontalWrapper';

const Chat = ({ sendChatMessage }) => {
    const chatMessages = useSelector(state => state.chat.messages);
    const chatters = useSelector(state => state.chat.chatters);
    const messageContainerElement = React.useRef(null);

    if (messageContainerElement.current) {
        messageContainerElement.current.scrollTop =
            messageContainerElement.current.scrollHeight;
    }

    return (
        <ChatSection>
            <HorizontalWrapper>
                <MessageContainer ref={messageContainerElement}>
                    {chatMessages.map(message => (
                        <ChatMessage message={message} key={message.id} />
                    ))}
                </MessageContainer>
                <ChatterList>
                    <ChatterListHeading>Listeners</ChatterListHeading>
                    {chatters.map(chatter => (
                        <ChatSubscriber chatter={chatter} key={chatter} />
                    ))}
                </ChatterList>
            </HorizontalWrapper>
            <ChatInput sendChatMessage={sendChatMessage} />
        </ChatSection>
    );
};

Chat.propTypes = {
    sendChatMessage: PropTypes.func.isRequired,
};

export default withChatClient(Chat);
