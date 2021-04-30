import React from 'react';
import { storiesOf } from '@storybook/react';
import ChatMessage from './ChatMessage';

const message = {
    userId: '1234',
    body: 'Lorem ipsum',
    timestamp: new Date().toISOString(),
};

storiesOf('ChatMessage', module).add('default', () => (
    <ChatMessage message={message} />
));
