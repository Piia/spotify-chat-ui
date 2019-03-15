import React from 'react';
import styled from 'styled-components';

const LoginLink = styled.a`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.lg};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.voodoo};
`;
LoginLink.displayName = 'LoginLink';

const LoginPage = () => {
    return <LoginLink href={ process.env.REACT_APP_BACKEND_LOGIN_URL }>Log in</LoginLink>;
}

export default LoginPage;
