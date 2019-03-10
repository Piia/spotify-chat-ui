import React from 'react';
import styled, { withTheme } from 'styled-components';

const Color = styled.div`
    display: inline-block;
    width: ${props => props.theme.font.size.xl};
    height: ${props => props.theme.font.size.xl};
    border-radius: 50%;
    border: 1px solid #eeeeee;
    background-color: ${props => props.color};
    margin-right: ${props => props.theme.spacing.md};
`;
const ColorLabel = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
`;
const ThemeRow = styled.li`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: ${props => props.theme.spacing.lg};
    list-style-type: none;

    &:nth-child(odd) {
        background-color: #fafafa;
    }
    &:nth-child(even) {
        background-color: #f6f6f6;
    }
`;
const colors = props => {
    console.log('ThemeColors', props);
    return <ul>{ Object.keys(props.theme.colors).map(colorName =>
        <ThemeRow key={ colorName }>
            <Color color={ props.theme.colors[colorName] } />
            <ColorLabel>{ colorName }</ColorLabel>
        </ThemeRow>
    ) }
    </ul>
};

export const ThemeColors = withTheme(colors);


const FontLabel = styled.span`
    font-family: ${props => props.font};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
`;
const fonts = props => {
    console.log('ThemeFonts', props);
    return <ul>{ Object.keys(props.theme.font.family).map(fontName =>
        <ThemeRow key={ fontName }>
            <FontLabel font={ props.theme.font.family[fontName] }>{ fontName }</FontLabel>
        </ThemeRow>
    ) }
    </ul>;
};

export const ThemeFonts = withTheme(fonts);
