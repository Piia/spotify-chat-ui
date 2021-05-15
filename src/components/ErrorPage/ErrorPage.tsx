import React, { FC } from 'react';
import styled from 'styled-components';

const ErrorText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.magnolia};
    padding: ${props => props.theme.spacing.md};
`;
ErrorText.displayName = 'ErrorText';

type ErrorPageProps = {
    message: string;
};

const ErrorPage: FC<ErrorPageProps> = ({
    message = 'Something went wrong',
}) => <ErrorText>{message}</ErrorText>;

export default ErrorPage;
