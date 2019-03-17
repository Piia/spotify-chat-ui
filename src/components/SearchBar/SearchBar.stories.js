import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchBar from './SearchBar';

storiesOf('SearchBar', module)
    .add('default', () => (
        <SearchBar onSearch={ action('search') } />
    )); 
