import React, { PureComponent, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import Image from 'components/Image/Image';

const PlayButton = styled.div`
    width: 1px;
    height: 1px;
    border: 10px solid transparent;
    border-left-color: ${props => props.theme.colors.varden};
    margin-left: auto;
    transition: transform 0.3s ease-in;

    &:hover {
        transform: scale(1.2);
        border-left-color: ${props => props.theme.colors.leather};
        cursor: pointer;
    }
`;
PlayButton.displayName = 'PlayButton';

const TrackInfo = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 ${props => props.theme.spacing.xs};
    overflow: hidden;
`;
TrackInfo.displayName = 'TrackInfo';

const marqueeAnimation = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(-50%, 0);
    }
`;


const TrackTitle = styled.div`
    display: inline-block;
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.bold};
    color: ${props => props.theme.colors.leather};
`;
TrackTitle.displayName = 'TrackTitle';

const AlbumTitle = styled.div`
    display: inline-block;
    font-size: ${props => props.theme.font.size.sm};
    font-family: ${props => props.theme.font.family.verdana};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.varden};
    white-space: pre;
`;
AlbumTitle.displayName = 'AlbumTitle';

const ArtistInfo = styled.span`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.varden};
`;
ArtistInfo.displayName = 'ArtistInfo';

const TitleRow = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.colors.varden};

    ${AlbumTitle} {
        margin-right: ${props => props.theme.spacing.md};
    }

`;
TitleRow.displayName = 'TitleRow';

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

    &:hover ${TitleRow} {
        overflow: overlay;
        text-overflow: visible;
        animation: ${props => props.hasMarquee && marqueeAnimation} 5s linear infinite;
        width: auto;
    }
`;
Item.displayName = 'Item';


class TrackItem extends PureComponent {
    albumTitleElement = null;

    state = {
        artistInfoOverflows: false
    }

    componentDidMount() {
        const childRight = this.albumTitleElement.getBoundingClientRect().right;
        const parentRight = this.albumTitleElement.parentNode.getBoundingClientRect().right;
        const isOverflowing = childRight > parentRight;

        this.setState({
            artistInfoOverflows: isOverflowing
        })
    }


    render() {
        const { imageUrl, album, track, artists, onPlay } = this.props;

        return (
            <Item hasMarquee={ this.state.artistInfoOverflows }>
                <Image url={ imageUrl } width={ 64 } height={ 64 } />
                <TrackInfo>
                    <TitleRow>
                        <Fragment>
                            <TrackTitle>{ track }</TrackTitle>
                            <AlbumTitle ref={ el => {this.albumTitleElement = el;} }> - { album }</AlbumTitle>
                        </Fragment>
                        { this.state.artistInfoOverflows ?
                            <Fragment>
                                <TrackTitle>{ track }</TrackTitle>
                                <AlbumTitle> - { album }</AlbumTitle>
                            </Fragment> : null
                        }
                    </TitleRow>
                    <ArtistInfo>{ artists.join(', ') }</ArtistInfo>
                </TrackInfo>
                { typeof onPlay === 'function' && <PlayButton onClick={ onPlay } /> }
            </Item>
        );
    }
}


TrackItem.defaultProps = {
    imageUrl: null,
    artists: [''],
    album: '',
    track: '',
    onPlay: null,
};

TrackItem.propTypes = {
    imageUrl: PropTypes.string,
    artists: PropTypes.array,
    ablum: PropTypes.string,
    track: PropTypes.string,
    onPlay: PropTypes.func,
};

export default TrackItem;
