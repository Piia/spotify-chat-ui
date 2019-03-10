import React from 'react';
import NavBar from './NavBar';

describe('NavBar', () => {
    let component;
    beforeEach(() => {
        component = shallow(<NavBar />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
