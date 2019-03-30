import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const StyledImage = styled.img`
    width: auto;
    height: 100%;
`;
StyledImage.displayName = 'StyledImage';

const Placeholder = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.theme.colors.leather};
`;
Placeholder.displayName = 'Placeholder';

const PanelImage = ({ url }) => {
    if (!url) {
        return <Placeholder />
    }
    return <StyledImage src={ url } />
};

PanelImage.defaultProps = {
    url: null
};

PanelImage.propTypes = {
    url: PropTypes.string
};

export default PanelImage;