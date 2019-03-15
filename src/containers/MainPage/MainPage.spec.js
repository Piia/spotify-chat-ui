import React from 'react';
import { MainPage } from './MainPage';
import NavBar from 'containers/NavBar/NavBar';

describe('MainPage', () => {
    let component, props;

    beforeEach(() => {
        props = {
            loggedIn: false,
            loadProfile: () => {},
        }
        component = shallow(<MainPage { ...props } />);
    })

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render NavBar', () => {
        expect(component.find(NavBar)).toExist();
    });
});
