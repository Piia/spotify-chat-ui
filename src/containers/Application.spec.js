import React from 'react';
import Application from './Application';
import NavBar from 'containers/NavBar/NavBar';

describe('Application', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Application />);
    })

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render NavBar', () => {
        expect(component.find(NavBar)).toExist();
    });
});
