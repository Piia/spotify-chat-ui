import React from 'react';
import Application from './Application';

describe('Application', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Application />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
