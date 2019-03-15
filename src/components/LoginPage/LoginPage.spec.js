import React from 'react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
    let component;
    beforeEach(() => {
        component = shallow(<LoginPage />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render link', () => {
        expect(component.find('LoginLink')).toExist();
    });
});
