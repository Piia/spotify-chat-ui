import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from 'components/Inputs/SearchInput';

const Bar = styled.div`
    position: relative;
    padding: ${props => props.theme.spacing.xs};
    height: 3rem;

    & > input {
        padding: ${props => props.theme.spacing.xs} 65px
            ${props => props.theme.spacing.xs}
            ${props => props.theme.spacing.md};
    }
`;
Bar.displayName = 'Bar';

const Search = styled.span`
    position: absolute;
    top: calc(${props => props.theme.spacing.md} + 4px);
    right: ${props => props.theme.spacing.xl};

    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.xs};
    font-weight: ${props => props.theme.font.weight.bold};
    line-height: 1.5;
    color: ${props => props.theme.colors.varden};
    text-transform: uppercase;
    transition: color 0.1s ease-in-out;

    &:hover {
        color: ${props => props.theme.colors.leather};
        cursor: pointer;
    }
`;
Search.displayName = 'Search';

export const PROPERTY_NAME = 'trackName';

const SearchBar = ({ onSearch }) => {
    const [model, setModel] = React.useState({});

    const handleInputChange = (property, value) => {
        setModel(oldModel => ({ ...oldModel, [property]: value }));
    };

    const submitSearch = () => {
        const searchWord = model[PROPERTY_NAME];
        if (searchWord && searchWord.length > 0) {
            onSearch(searchWord);
        }
    };

    const handleKeyPress = event => {
        if (event && event.key === 'Enter') {
            submitSearch();
        }
    };

    return (
        <Bar>
            <SearchInput
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                property={PROPERTY_NAME}
                model={model}
                placeholder="Search tracks"
            />
            <Search onClick={submitSearch}>Search</Search>
        </Bar>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
