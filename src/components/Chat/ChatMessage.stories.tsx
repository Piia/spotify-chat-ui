import React from 'react';
import { storiesOf } from '@storybook/react';
import ChatMessage from './ChatMessage';
import { ChatMessage as MessageType } from './Chat.types';

const message: MessageType = {
    userId: '1234',
    body: 'Lorem ipsum',
    timestamp: new Date().toISOString(),
};

storiesOf('ChatMessage', module).add('default', () => (
    <ChatMessage message={message} />
));
