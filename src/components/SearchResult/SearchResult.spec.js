import React from 'react';
import SearchResult from './SearchResult';
import TrackList from 'components/TrackList/TrackList';
import TrackItem from 'components/TrackList/TrackItem';
import { tracks } from 'test_data/tracks';

describe('SearchResult', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SearchResult tracks={ tracks } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render TrackList', () => {
        expect(component.find(TrackList)).toExist();
    });

    it('should render a track item for every track', () => {
        expect(component.find(TrackItem)).toHaveLength(tracks.length);
    });
});
