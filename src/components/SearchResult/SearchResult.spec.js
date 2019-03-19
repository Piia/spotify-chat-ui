import React from 'react';
import SearchResult from './SearchResult';
import TrackList from 'components/TrackList/TrackList';
import TrackItem from 'components/TrackList/TrackItem';
import Spinner from 'components/Spinner/Spinner';
import { tracks } from 'test_data/tracks';

describe('SearchResult', () => {
    let component, props;
    beforeEach(() => {
        props = {
            onPlay: spy(),
            tracks,
        };
        component = shallow(<SearchResult { ...props } />);
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

    describe('when loading', () => {
        let component, props;
        beforeEach(() => {
            props = {
                onPlay: spy(),
                tracks,
                loading: true,
            };
            component = shallow(<SearchResult { ...props } />);
        });

        it('should render component', () => {
            expect(component).toExist();
        });
    
        it('should render TrackList', () => {
            expect(component.find(TrackList)).toExist();
        });
    
        it('should render Spinner', () => {
            expect(component.find(Spinner)).toExist();
        });
    });
});
