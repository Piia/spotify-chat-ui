import React from 'react';
import SearchBar from './SearchBar';
import SearchInput from 'components/Inputs/SearchInput';

describe('SearchBar', () => {
    let component, props;

    beforeEach(() => {
        props = {
            onSearch: spy(),
        };
        component = shallow(<SearchBar { ...props } />);
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

    describe('when handleChange is called', () => {
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

    describe('when handleKeyPress is called', () => {
        let property, value;

        beforeEach(() => {
            property = component.instance().property;
            value = 'ghjk'
            component.setState({ model: { [property]: value } })
            component.find(SearchInput).props().onKeyPress();
            component.find(SearchInput).props().onKeyPress({ key: 'Enter' });
        });

        it('should call onSearch', () => {
            expect(props.onSearch.calledOnce).toBe(true);
        });

        it('should pass correct arguments', () => {
            expect(props.onSearch.firstCall.args[0]).toEqual(component.state().model[property]);
        });
    });
});
