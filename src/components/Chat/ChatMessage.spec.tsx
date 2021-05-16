import React from 'react';
import ChatMessage from './ChatMessage';
import { shallow, ShallowWrapper } from 'enzyme';

describe('ChatMessage', () => {
    let component: ShallowWrapper<any, any, any>;
    let props;

    beforeEach(() => {
        props = {
            message: {
                userId: 'fakeuser',
                id: 'abc123',
                body: 'body',
                timestamp: '0',
            },
        };
        component = shallow(<ChatMessage {...props} />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });
});
