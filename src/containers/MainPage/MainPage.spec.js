import React from 'react';
import { MainPage } from './MainPage';
import NavBar from 'containers/NavBar/NavBar';
import Chat from 'containers/Chat/Chat';
import SearchPanel from 'containers/SearchPanel/SearchPanel';

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

    it('should render SearchPanel', () => {
        expect(component.find(SearchPanel)).toExist();
    });

    it('should render Chat', () => {
        expect(component.find(Chat)).toExist();
    });
});
