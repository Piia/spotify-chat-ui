import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { ThemeColors, ThemeFonts } from './Theme';

console.log('theme', theme);

storiesOf('Theme', module).add('default', () => (
    <ThemeProvider theme={theme}>
        <div>
            <ThemeColors />
            <ThemeFonts />
        </div>
    </ThemeProvider>
));
