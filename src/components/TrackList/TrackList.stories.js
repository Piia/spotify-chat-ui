import React from 'react';
import { storiesOf } from '@storybook/react';
import TrackList from './TrackList';
import TrackItem from './TrackItem';


const trackSearchResults = require('test_data/track_search_results.json');


storiesOf('TrackList', module)
    .add('default', () => (
        <TrackList>
            <TrackItem title="Title" text="Lorem ipsum." />
            <TrackItem title="Title" text="Lorem ipsum." />
            <TrackItem title="Title" text="Lorem ipsum." />
        </TrackList>
    ))
    .add('withTestData', () => (
        <TrackList>
            {trackSearchResults.items.map( (searchResult, i) => (
                <TrackItem 
                    key={i} 
                    imageUrl={searchResult.album.images[2].url} 
                    title={searchResult.name} 
                    text={searchResult.album.name} />
            ))}
        </TrackList>
    ));
