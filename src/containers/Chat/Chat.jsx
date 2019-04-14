import React, { PureComponent } from 'react';
import styled from 'styled-components';

import withChatClient from 'components/withChatClient/withChatClient';

const Container = styled.article`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
`;
Container.displayName = 'Container';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
`;


class Chat extends PureComponent {
    
    componentDidMount() {

        setTimeout(() => {
            this.props.sendChatMessage("Hei maailma");   
        }, 2000);     
    }

    render() {
        return (
            <Container>
                <BasicText>Hello Chat!</BasicText>
            </Container>
        );
    }
}


export default withChatClient(Chat);
