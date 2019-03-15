import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 1em solid ${props => props.theme.colors.strikemaster};
    border-top-color: ${props => props.theme.colors.magnolia};
    border-radius: 50%;
    width: 7.5em;
    height: 7.5em;
    animation: ${spin} 1.75s linear infinite;
`;

export default Spinner;
