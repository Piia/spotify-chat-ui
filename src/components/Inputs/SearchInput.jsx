import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    background-color: ${props => props.theme.colors.outerSpace};
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    line-height: 1.5;
    color: ${props => props.theme.colors.varden};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    border-radius: 2em;
    border: 1px solid ${props => props.theme.colors.black};
    appearance: none;
    
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.colors.varden};
    }
`;

const SearchInput = ({ model, property, onChange, onKeyPress, placeholder, disabled }) => {

    return (
        <Input
            value={ model && property && model[property] }
            onChange={ (event) => onChange(property, event.target.value) }
            onKeyPress={ onKeyPress }
            placeholder={ placeholder }
            disabled={ disabled }
            spellCheck="false"
        />
    );
}

SearchInput.defaultProps = {
    placeholder: '...',
    disabled: false,
    onKeyPress: undefined,
};

SearchInput.propTypes = {
    model: PropTypes.object.isRequired,
    property: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
}

export default SearchInput;
