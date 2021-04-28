import React from 'react';
import NavBar from './NavBar';

jest.mock('react-redux', () => ({
    __esModule: true,
    useSelector: () => {},
}));

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
