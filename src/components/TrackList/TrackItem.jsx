import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Image from 'components/Image/Image';

const Item = styled.li`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: ${props => props.theme.spacing.xs};
    transition: background-color 0.1s ease-out;

    &:hover {
        background-color: ${props => props.theme.colors.outerSpace};
    }
`;
Item.displayName = 'Item';

const TrackInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
`;
TrackInfo.displayName = 'TrackInfo';

const Title = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.leather};
`;
Title.displayName = 'Title';

const Text = styled.span`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.varden};
`;
Text.displayName = 'Text';


const TrackItem = ({ imageUrl, title, text }) => {

    return (
        <Item>
            <Image url={ imageUrl } width={ 20 } height={ 20 } />
            <TrackInfo>
                <Title>{ title }</Title>
                <Text>{ text }</Text>
            </TrackInfo>
        </Item>
    );
};

TrackItem.defaultProps = {
    imageUrl: null,
    title: '',
    text: '',
};

TrackItem.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
};

export default TrackItem;
