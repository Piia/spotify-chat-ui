import React from 'react';
import ChatMessage from './ChatMessage';

describe('ChatMessage', () => {
    let component;
    beforeEach(() => {
        component = shallow(<ChatMessage />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
