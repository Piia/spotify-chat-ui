import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/Inputs/SearchInput';

const Bar = styled.div`
    padding: ${props => props.theme.spacing.md} 0;
`;
Bar.displayName = 'Bar';

const Search = styled.span`
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.varden};
    transition: color 0.1s ease-in-out;

    &:hover {
        color: ${props => props.theme.colors.leather};
        cursor: pointer;
    }
`;
Search.displayName = 'Search';

class SearchBar extends PureComponent {
    state = {
        model: {}
    };

    property = 'trackName';

    handleInputChange = (property, value) => {
        this.setState(oldState => ({ model: { ...oldState.model, [property]: value } }))
    };

    handleKeyPress = event => {
        if (event && event.key === 'Enter') {
            this.submitSearch();
        };
    };

    submitSearch = () => {
        const searchWord = this.state.model[this.property];
        if (searchWord && searchWord.length > 0) {
            this.props.onSearch(searchWord);
        };
    };

    render() {
        return (
            <Bar>
                <SearchInput
                    onChange={ this.handleInputChange }
                    onKeyPress={ this.handleKeyPress }
                    property={ this.property }
                    model={ this.state.model }
                    placeholder="Search tracks"
                />
                <Search onClick={ this.submitSearch }>Search</Search>
            </Bar>
        );
    };
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
