import React from 'react';
import SearchBar from './SearchBar';
import SearchInput from 'components/Inputs/SearchInput';

describe('SearchBar', () => {
    let component, props;

    beforeEach(() => {
        props = {
            onSearch: spy(),
        };
        component = shallow(<SearchBar {...props} />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render Search', () => {
        expect(component.find('Search')).toExist();
    });

    it('should render SearchInput', () => {
        expect(component.find(SearchInput)).toExist();
    });

    it('should pass props to input', () => {
        const passedProps = component.find(SearchInput).props();
        expect(passedProps.onChange).toBeDefined();
        expect(passedProps.property).toBeDefined();
        expect(passedProps.model).toBeDefined();
    });

    describe('when handleChange is called', () => {
        let property, value;

        beforeEach(() => {
            property = 'asdf';
            value = 'ghjk';
            component.find(SearchInput).props().onChange(property, value);
        });

        it('should change model', () => {
            expect(component.find(SearchInput).props().model[property]).toEqual(
                value
            );
        });
    });
});
