import React from 'react';
import Chat from './Chat';

describe('Chat', () => {
    let component;
    beforeEach(() => {
        component = shallow(<Chat />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
