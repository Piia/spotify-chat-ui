import styled from 'styled-components';

const TrackList = styled.ul`
    background-color: ${props => props.theme.colors.goblin};
    width: 30em;
    height: 40em;
    overflow-y: scroll;
`;
TrackList.displayName = 'TrackList';

export default TrackList;
