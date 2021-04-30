import React, { Fragment } from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';

const themeDecorator = Story => (
    <ThemeProvider theme={ theme }>
        <Fragment>
            <GlobalStyle />
            <Story />
        </Fragment>
    </ThemeProvider>
);

export const decorators = [themeDecorator];

export const parameters = {
    options: {
        showPanel: false,
        panelPosition: 'bottom',
    }
};

export const globalTypes = {};
