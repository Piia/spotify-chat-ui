import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchResult from './SearchResult';

storiesOf('SearchResult', module)
    .add('default', () => (
        <SearchResult tracks={ [] } />
    )); 
