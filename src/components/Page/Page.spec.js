import React from 'react';
import Page from './Page';

describe('Page', () => {
    let component, props;
    beforeEach(() => {
        props = {
            loggedIn: true,
        };
        component = shallow(<Page { ...props } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
