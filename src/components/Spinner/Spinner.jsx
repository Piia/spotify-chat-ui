import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: ${props => `${Math.round(props.size * 16 / 7)}px`} solid ${props => props.theme.colors.strikemaster};
    border-top-color: ${props => props.theme.colors.magnolia};
    border-radius: 50%;
    width: ${props => `${props.size * 16}px`};
    height: ${props => `${props.size * 16}px`};
    animation: ${spin} 1.75s linear infinite;
`;

Spinner.defaultProps = {
    size: 7,
}

Spinner.propTypes = {
    size: PropTypes.number,
}

export default Spinner;
