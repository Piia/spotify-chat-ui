import React from 'react';
import Page from './Page';

describe('Page', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Page />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
