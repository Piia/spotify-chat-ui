import React from 'react';
import SearchBar from './SearchBar';
import SearchInput from 'components/Inputs/SearchInput';

describe('SearchBar', () => {
    let component;
    beforeEach(() => {
        component = shallow(<SearchBar onSearch={ () => {} } />);
    });

    it('should render component', () => {
        expect(component).toExist();
    });

    it('should render label', () => {
        expect(component.find('Label')).toExist();
    });

    it('should render input', () => {
        expect(component.find(SearchInput)).toExist();
    });

    it('should pass props to input', () => {
        const passedProps = component.find(SearchInput).props();
        expect(passedProps.onChange).toBeDefined();
        expect(passedProps.property).toBeDefined();
        expect(passedProps.model).toBeDefined();
    });

    describe('when onChange is called', () => {
        let property, value;

        beforeEach(() => {
            property = 'asdf';
            value = 'ghjk';
            component.find(SearchInput).props().onChange(property, value);
        });

        it('should change state', () => {
            expect(component.state().model[property]).toEqual(value);
        });
    });
});
