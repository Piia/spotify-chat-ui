import React from 'react';
import { storiesOf } from '@storybook/react';
import TrackList from './TrackList';
import TrackItem from './TrackItem';

storiesOf('TrackList', module)
    .add('default', () => (
        <TrackList>
            <TrackItem title="Title" text="Lorem ipsum." />
            <TrackItem title="Title" text="Lorem ipsum." />
            <TrackItem title="Title" text="Lorem ipsum." />
        </TrackList>
    )); 
