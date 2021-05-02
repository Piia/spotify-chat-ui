import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;
Container.displayName = 'Container';

const ChatSubscriber = ({ chatter }) => {
    return <Container>{chatter}</Container>;
};

export default ChatSubscriber;
