import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.voodoo};
`;
ErrorText.displayName = 'ErrorText';

const ErrorPage = ({ message }) => <ErrorText>{ message }</ErrorText>;

ErrorPage.defaultProps = {
    message: 'Something went wrong',
};

ErrorPage.propTypes = {
    message: PropTypes.string,
};

export default ErrorPage;
