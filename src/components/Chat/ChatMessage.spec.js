import React from 'react';
import ChatMessage from './ChatMessage';

describe('ChatMessage', () => {
    let component, props;
    beforeEach(() => {
        props = {
            message: {
                userId: 'fakeuser',
            },
        };
        component = shallow(<ChatMessage {...props} />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
