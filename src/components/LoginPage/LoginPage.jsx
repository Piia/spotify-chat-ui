import React from 'react';
import styled from 'styled-components';

const LinkBackground = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10em;
    height: 7em;
    margin: 15vh auto auto;
    background-color: ${props => props.theme.colors.strikemaster};
`;
LinkBackground.displayName = 'LinkBackground'

const LoginLink = styled.a`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.lg};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.magnolia};
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s ease-in;

    &:hover {
        color: ${props => props.theme.colors.voodoo};
    }
`;
LoginLink.displayName = 'LoginLink';

const LoginPage = () => {
    return (
        <LinkBackground>
            <LoginLink href={ process.env.REACT_APP_BACKEND_LOGIN_URL }>
                Log in
            </LoginLink>
        </LinkBackground>
    );
}

export default LoginPage;
