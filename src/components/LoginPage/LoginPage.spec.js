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

    it('should render link backrgound', () => {
        expect(component.find('LinkBackground')).toExist();
    });

    it('should render link', () => {
        expect(component.find('LoginLink')).toExist();
        expect(component.find('LoginLink').children().text()).toEqual('Log in');
    });

    it('should render info', () => {
        expect(component.find('Info')).toExist();
        expect(component.find('Info').children().text()).toEqual(
            '(Using Spotify)'
        );
    });
});
