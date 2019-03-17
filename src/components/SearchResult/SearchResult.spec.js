import React from 'react';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SearchResult tracks={ [] } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
