import React from 'react';
import { NavBar } from './NavBar';

describe('NavBar', () => {
    let component, props;
    beforeEach(() => {
        props = {
            profile: {},
        };
        component = shallow(<NavBar {...props} />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
