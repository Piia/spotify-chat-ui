import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchBar from './SearchBar';
import { theme } from 'styles/theme';

storiesOf('SearchBar', module).add('default', props => (
    <div style={{ padding: '3em', backgroundColor: theme.colors.goblin }}>
        <SearchBar onSearch={action('search')} />
    </div>
));
