import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import React, { Fragment } from 'react';

import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import GlobalStyle from 'styles/global';

// https://dzone.com/articles/practical-guide-to-storybook-driven-development

addDecorator(story => (
    <ThemeProvider theme={ theme }>
        <Fragment>
            <GlobalStyle />
            { story() }
        </Fragment>
    </ThemeProvider>
));
addDecorator(withKnobs);


addParameters({
    options: {
        showPanel: false,
        panelPosition: 'bottom',
    }
});

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
