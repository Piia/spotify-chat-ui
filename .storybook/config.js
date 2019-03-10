import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { theme } from 'styles/theme';

// https://dzone.com/articles/practical-guide-to-storybook-driven-development

addDecorator(withThemesProvider([theme]));
addDecorator(withKnobs);

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
