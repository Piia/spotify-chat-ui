import styled from 'styled-components';

const TrackList = styled.ul`
    background-color: ${props => props.theme.colors.goblin};
    overflow-y: scroll;
`;
TrackList.displayName = 'TrackList';

export default TrackList;
