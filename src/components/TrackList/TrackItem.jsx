import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Image from 'components/Image/Image';

const PlayButton = styled.div`
    width: 1px;
    height: 1px;
    border: 15px solid transparent;
    border-left-color: ${props => props.theme.colors.varden};
    margin-left: auto;
    transition: transform, border-left-color 0.1s ease-in-out;

    &:hover {
        transform: scale(1.2);
        border-left-color: ${props => props.theme.colors.leather};
        cursor: pointer;
    }
`;
PlayButton.displayName = 'PlayButton';

const Item = styled.li`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: ${props => props.theme.spacing.xxs};
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


const TrackItem = ({ imageUrl, title, text, onPlay }) => {

    return (
        <Item>
            <Image url={ imageUrl } width={ 64 } height={ 64 } />
            <TrackInfo>
                <Title>{ title }</Title>
                <Text>{ text }</Text>
            </TrackInfo>
            { typeof onPlay === 'function' && <PlayButton onClick={ onPlay } /> }
        </Item>
    );
};

TrackItem.defaultProps = {
    imageUrl: null,
    title: '',
    text: '',
    onPlay: null,
};

TrackItem.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    onPlay: PropTypes.func,
};

export default TrackItem;
