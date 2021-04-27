import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
    width: ${props => props.width}px;
    min-width: ${props => props.width}px;
    max-width: ${props => props.width}px;
    height: ${props => props.height}px;
    min-height: ${props => props.height}px;
    max-height: ${props => props.height}px;
`;
StyledImage.displayName = 'StyledImage';

const Placeholder = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.theme.colors.leather};
`;
Placeholder.displayName = 'Placeholder';

const Image = ({ url, width, height }) => {
    if (!url) {
        return <Placeholder width={width} height={height} />;
    }
    return <StyledImage src={url} width={width} height={height} />;
};

Image.defaultProps = {
    url: null,
    width: 64,
    height: 64,
};

Image.propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Image;
