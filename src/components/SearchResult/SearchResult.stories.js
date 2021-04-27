import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import SearchResult from './SearchResult';
import { tracks } from 'test_data/tracks';

storiesOf('SearchResult', module)
    .addDecorator(withKnobs)
    .add('default', () => {
        const loading = boolean('Loading', false);
        const error = boolean('Error', false);

        return (
            <SearchResult
                tracks={tracks}
                onPlay={action('play')}
                loading={loading}
                error={error ? { message: 'Error message' } : {}}
            />
        );
    });
