import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/Inputs/SearchInput';

const Bar = styled.div`
    padding: ${props => props.theme.spacing.md} 0;
`;
Bar.displayName = 'Bar';

const Label = styled.label`
    display: block;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.varden};
`;
Label.displayName = 'Label';

class SearchBar extends PureComponent {
    state = {
        model: {}
    };

    handleInputChange = (property, value) => {
        this.setState(oldState => ({ model: { ...oldState.model, [property]: value } }))
    };

    render() {
        return (
            <Bar>
                <Label>Search tracks</Label>
                <SearchInput
                    onChange={ this.handleInputChange }
                    property="trackName"
                    model={ this.state.model }
                />
            </Bar>
        );
    };
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
