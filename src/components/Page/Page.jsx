import React from 'react';
import styled from 'styled-components';

const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.voodoo};
`;

const Page = props => {
    return <BasicText>Hello Page!</BasicText>
};

export default Page;
