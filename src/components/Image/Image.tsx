import React, { FC } from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
    width: ${props => props.width}px;
    min-width: ${props => props.width}px;
    max-width: ${props => props.width}px;
    height: ${props => props.height}px;
    min-height: ${props => props.height}px;
    max-height: ${props => props.height}px;
`;
StyledImage.displayName = 'StyledImage';

type PlaceHolderProps = {
    width: number;
    height: number;
};

const Placeholder = styled.div<PlaceHolderProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: ${props => props.theme.colors.leather};
`;
Placeholder.displayName = 'Placeholder';

export type ImageProps = {
    url?: string;
    width?: number;
    height?: number;
};

const Image: FC<ImageProps> = ({ url, width = 64, height = 64 }) => {
    if (!url) {
        return <Placeholder width={width} height={height} />;
    }
    return <StyledImage src={url} width={width} height={height} />;
};

export default Image;
