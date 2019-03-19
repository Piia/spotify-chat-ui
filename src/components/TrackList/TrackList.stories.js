import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TrackList from './TrackList';
import TrackItem from './TrackItem';
import { tracks } from 'test_data/tracks';


storiesOf('TrackList', module)
    .add('default', () => (
        <TrackList>
            <TrackItem title="Title" text="Lorem ipsum." onPlay={ action('play') } />
            <TrackItem title="Title" text="Lorem ipsum." onPlay={ action('play') } />
            <TrackItem title="Title" text="Lorem ipsum." onPlay={ action('play') } />
        </TrackList>
    ))
    .add('withTestData', () => (
        <TrackList>
            {tracks.map( (searchResult, i) => (
                <TrackItem 
                    key={i} 
                    imageUrl={searchResult.album.images[2].url} 
                    title={searchResult.name} 
                    text={searchResult.album.name}
                    onPlay={ action('play') }
                />
            ))}
        </TrackList>
    ));
