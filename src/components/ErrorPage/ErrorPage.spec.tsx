import React from 'react';
import ErrorPage from './ErrorPage';
import { shallow, ShallowWrapper } from 'enzyme';

describe('ErrorPage', () => {
    let component: ShallowWrapper<any, any, any>;
    beforeEach(() => {
        component = shallow(<ErrorPage />);
    });

    it('should render component with message', () => {
        const message = 'This is Error';
        component.setProps({ message });

        expect(component).toExist();
        expect(component.props().message).toBeUndefined();
        expect(component.find('ErrorText').children().text()).toEqual(message);
    });

    it('should render default message', () => {
        const defaultMessage = 'Something went wrong';

        expect(component).toExist();
        expect(component.find('ErrorText').children().text()).toEqual(
            defaultMessage
        );
    });
});
