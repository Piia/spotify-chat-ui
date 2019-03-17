import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat from './Chat';

storiesOf('Chat', module)
    .add('default', () => (
        <Chat />
    )); 
