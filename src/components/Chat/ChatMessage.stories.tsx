import React from 'react';
import { storiesOf } from '@storybook/react';
import ChatMessage from './ChatMessage';

const message = {
    id: '6e4f683b-2cf1-4162-9e98-43fd65af4d57',
    userId: '1234',
    body: 'Lorem ipsum',
    timestamp: new Date().toISOString(),
};

storiesOf('ChatMessage', module).add('default', () => (
    <ChatMessage message={message} />
));
