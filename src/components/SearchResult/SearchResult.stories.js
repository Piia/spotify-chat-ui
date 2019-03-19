import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchResult from './SearchResult';
import { tracks } from 'test_data/tracks';

storiesOf('SearchResult', module)
    .add('default', () => (
        <SearchResult tracks={ tracks } />
    )); 
