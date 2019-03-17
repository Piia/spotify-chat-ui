import React from 'react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SearchBar onSearch={ () => {} } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
