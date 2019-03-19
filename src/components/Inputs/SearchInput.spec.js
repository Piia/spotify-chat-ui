import React from 'react';
import SearchInput from 'components/Inputs/SearchInput';

describe('SearchInput', () => {
    let component, props;

    beforeEach(() => {
        props = {
            model: {},
            property: 'prop',
            onChange: spy(),
        };

        component = shallow(<SearchInput { ...props } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should call onChange', () => {
        const change = 'asdfg';
        component.simulate('change', { target: { value: change } });
        expect(props.onChange.calledOnce).toBe(true);
        expect(props.onChange.firstCall.args).toEqual([props.property, change]);
    });
});
